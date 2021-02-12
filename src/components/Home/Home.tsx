import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import SideBar from '../Sidebar/SideBar';
import { Weather, Welcome } from "../../types/interfaces";
import Moment from 'react-moment';
import moment from "moment";
import { WelcomeAll } from '../../types/allDaysInterfaces';
import './Home.css';
import { RouteComponentProps } from "react-router-dom";


export default function Home() {
    const [data, setData] = useState<Welcome>();
    const [days, setDays] = useState<WelcomeAll>();

    const fetchData = async (city: string) => {
        try {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a32190878843e4880bb3c541fbe9127`,
                {
                    method: "GET",
                }
            );
            if (response.ok) {
                const data = await response.json();
                setData(data);
                fetchOtherDays(city);
                console.log("aaaaa", data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchOtherDays = async (city: string) => {
        try {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9a32190878843e4880bb3c541fbe9127`,
                {
                    method: "GET",
                }
            );
            if (response.ok) {
                const data = await response.json();
                setDays(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container fluid>
            <Row>
                <SideBar fetchData={fetchData} data={data} />
                <Col md={9} style={{ height: "100vh", backgroundColor: "#ffff" }}>
                    <Container className="justify-content-center align-items-center text-center">
                       {days && <h2 className="text-left pt-5 pb-2">About tomorrow</h2>}
                        <Row className="d-flex justify-content-center align-items-center text-center ">
                            {days && days.list.splice(0, 4).map((e) => {
                                return (
                                    <Col md={3} sm={12}>
                                        <Card style={{ width: '14rem' }} className="py-1 card-next-days">
                                            <Card.Body>
                                                <Card.Title>{moment(e.dt_txt, "YYYY-MM-DD HH:mm:ss").format('dddd')}</Card.Title>
                                                <Card.Subtitle>{moment(e.dt_txt, "YYYY-MM-DD HH:mm:ss").format("hh:mm")}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted "><img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}.png`} className="image-temp" /></Card.Subtitle>
                                                <Card.Text className="font-weight-bold">
                                                    {e.weather[0].main}
                                                </Card.Text>
                                                <Card.Text>
                                                    {e.main.temp_min} F° - {' '} {e.main.temp_max} F°
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                        {data ?
                        (
                            <>
                    <h2 className="text-left pt-5 pb-2">Today's highlights</h2>
                        <Row>
                            <Col md={4} sm={12}>
                                <Card style={{ width: '18rem' }} className="card-next-days">
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted "><img src="https://img.icons8.com/plasticine/2x/wind.png" style={{width:"100px"}}/></Card.Subtitle>
                                        <Card.Text className="font-weight-bold">            
                                                Wind
                                       </Card.Text>
                                        <Card.Text  className="p-0 m-0">
                                            speed: {data && data.wind.speed}
                                    </Card.Text>
                                    <Card.Text className="p-0 m-0">
                                    deg: {data && data.wind.deg} °
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} sm={12}>
                                <Card style={{ width: '18rem' }} className="card-next-days">
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted "><img src="https://img.icons8.com/plasticine/2x/temperature-sensitive.png" style={{width:"100px"}} /></Card.Subtitle>
                                        <Card.Text className="font-weight-bold">            
                                                Temperature
                                       </Card.Text>
                                        <Card.Text  className="p-0 m-0">
                                            max: {data && data.main.temp_max} F°
                                    </Card.Text>
                                    <Card.Text className="p-0 m-0">
                                    min: {data && data.main.temp_min} F°
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} sm={12}>
                                <Card style={{ width: '18rem' }} className="card-next-days">
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted "><img src="https://icons.iconarchive.com/icons/custom-icon-design/lovely-weather-2/512/Humidity-icon.png" style={{width:"100px"}} /></Card.Subtitle>
                                        <Card.Text className="font-weight-bold">            
                                                Humidity
                                       </Card.Text>
                                        <Card.Text  className="p-0 m-0">
                                          {data && data.main.humidity} %
                                    </Card.Text>
                                    <Card.Text className="p-0 m-0">
                                    pressure: {data && data.main.pressure} 
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        </>
                        )
                        : <div className="d-flex justify-content-center align-items-center text-center mt-5 py-5" style={{flexDirection:"column"}}><h1 className="mt-5 py-5 font-weight-light">
                        ☀️ search for your city... ☀️</h1>
                        <h2 className="mt-2 font-weight-light">and check if u need to take an ☂️ with you!</h2>
                        </div>}
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

