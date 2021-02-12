import React, { useState } from 'react'
import { Col, Card, InputGroup, FormControl, Button } from 'react-bootstrap'
import './SideBar.css'
import { Weather, Welcome } from "../../types/interfaces";
import { HiSearchCircle } from 'react-icons/hi'
import { createIntersectionTypeNode } from 'typescript';
interface Props {
    fetchData: (city: string) => void,
    data?: Welcome
}

export default function SideBar({ fetchData, data }: Props) {
    const [city, setCity] = useState('');
    return (
        <Col style={{ height: "100vh", backgroundColor: "#FFD363" }} md={3} sm={12} className="d-flex justify-content-start align-items-center text-left sidebar py-2">
            <InputGroup className="mt-3 search-input">
                <InputGroup.Prepend className="prepend">
                    <InputGroup.Text id="searchquery" className="search-input py-0" onClick={() => fetchData(city)}><HiSearchCircle style={{ color: "#000", fontSize: "28px" }} /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="search.."
                    aria-label="searchquery"
                    aria-describedby="searchquery"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    id="searchquery"
                    className="search-input"
                />
            </InputGroup>
            {data &&
                <div className="text-left">
                    <div className="d-flex text-center align-items-center">
                        <img src={`http://openweathermap.org/img/wn/${data && data.weather[0].icon}@4x.png`} className="weather-icon my-4" />
                    </div>
                    <h1 className="mt-3 temp">{data.main.temp} C°</h1>
                    <h4>{data.name}, {data.sys.country}</h4>
                    <div className="text-left my-5">
                        <p className="p-0 m-0"><img src={`http://openweathermap.org/img/wn/${data && data.weather[0].icon}.png`} />{data.weather[0].main}</p>
                        <p className="p-0 m-0"><img src={`http://openweathermap.org/img/wn/${data && data.weather[0].icon}.png`} />{data.weather[0].description}</p>
                    </div>
                </div>

            }
          
        </Col>
    )
}
