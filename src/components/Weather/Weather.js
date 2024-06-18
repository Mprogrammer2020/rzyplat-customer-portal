import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Weather.css";
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
function WeatherDetail() {
    return (
        <div>
            <section className='customer-section'>
                {/* header section statr */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../../assets/images/weather-icon.svg").default} className="me-2 weather-icon" alt="icons" /> Weather</h5>
                            </div>
                        </Col>
                        <Col xs={6} md={6}>
                            <div className='header-right-box'>
                                <Form>
                                    <Form.Group className="position-relative w-50" controlId="exampleForm.ControlInput1">
                                        <img src={require("../../assets/images/iconamoon_search.svg").default} className="search-icon" alt="icons" />
                                        <Form.Control type="email" placeholder="Search" />
                                        <span className='cutomer-text'>ALL</span>
                                        <img src={require("../../assets/images/mi_filter.svg").default} className="filter-icon" alt="icons" />
                                    </Form.Group>
                                    <Link>
                                        <img src={require("../../assets/images/mdi_message-badge.svg").default} className="" alt="icons" />
                                    </Link>
                                    <Link>
                                        <img src={require("../../assets/images/streamline_notification-alarm-2-solid.svg").default} className="" alt="icons" />
                                    </Link>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </header>
                {/* header section ends */}
                {/* weather summary section start */}
                <div className="customer-outer-section">
                    <Row>
                        <Col md={8}>
                            <div className="weather-outer-section">
                                <div className="weather-header">
                                    <h5 className='heading-main text-dark'><img src={require("../../assets/images/weather-icon.svg").default} className="me-2" alt="icons" /> Weather Summary</h5>
                                    <div className="position-relative drop-down-upper">
                                        <i className="fa-solid fa-chevron-down"></i>
                                        <Form.Select aria-label="Default select example">
                                            <option>Property Name</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </div>
                                </div>
                                <div className="weather-body">
                                    <Row>
                                        <Col md={6}>
                                            <div className="current-weather-box">
                                                <h5 className='heading-main text-dark'>Current Weather <span>09:00 PM</span></h5>
                                                <div className="outer-weather-main-box">
                                                    <h5 className="temp-text"><img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />32 <span> &#x2109;</span></h5>
                                                    <div className="weather-main-txt">
                                                        <p>Partly sunny</p>
                                                        <span className="small-text">Feels like 39°</span>
                                                    </div>
                                                </div>
                                                <div className="air-quality-outer">
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Air Quality</p>
                                                            <h6>86</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-16.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Wind</p>
                                                            <h6>74 mp/h</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-5.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Humidity</p>
                                                            <h6>26%</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="air-quality-outer mt-2">
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-2.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Visibility</p>
                                                            <h6>8 km</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-3.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Pressure</p>
                                                            <h6>1012 mb</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-6.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Dew Point</p>
                                                            <h6>9°</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="hurricane-warning-box">
                                                <h5 className="red-text"><img src={require("../../assets/images/red-weather.svg").default} className="me-2" alt="icons" />Hurricane Warning</h5>
                                                <p>A hurricane warning has been issues for Georgia . A hurricane is expected to make landfall in the next 9 hours. Sutained winds of 78km/h and heavy rainfall are expected, with potential for flash flooding and storm surge.</p>
                                                <span className="alert-warning">Alert Level: High</span>
                                                <span className="alert-warning">Date: 19-04-24</span>
                                                <span className="alert-warning">Time: 11:00 PM</span>
                                                <span className="alert-warning">Wind: 74 mph</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr className="line"></hr>
                                    <div className="forecast-weather mt-3">
                                        <h5 className='heading-main text-dark mb-3'> Hourly Forecast</h5>
                                        <Swiper
                                            slidesPerView={8}
                                            spaceBetween={10}
                                            // pagination={{
                                            //     clickable: true,
                                            // }}
                                            // modules={[Pagination]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> Now</h5>
                                                    <img src={require("../../assets/images/cloud-1.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 10AM</h5>
                                                    <img src={require("../../assets/images/weather-2.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 11AM</h5>
                                                    <img src={require("../../assets/images/cloud-1.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 12AM</h5>
                                                    <img src={require("../../assets/images/cloud-1.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 1PM</h5>
                                                    <img src={require("../../assets/images/weather-3.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 2PM</h5>
                                                    <img src={require("../../assets/images/weather-4.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 3PM</h5>
                                                    <img src={require("../../assets/images/weather-4.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 4PM</h5>
                                                    <img src={require("../../assets/images/weather-4.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box">
                                                    <h5 className='heading-main text-dark'> 4PM</h5>
                                                    <img src={require("../../assets/images/weather-4.png")} className="" alt="icons" />
                                                    <h5 className="temp-text">32&deg;</h5>
                                                    <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />26%</p>
                                                    <p className="mt-3">Partly sunny</p>
                                                </div>
                                            </SwiperSlide>

                                        </Swiper>
                                    </div>
                                    <hr className="line"></hr>
                                    <div className="forecast-weather mt-3">
                                        <h5 className='heading-main text-dark mb-3'> 10 Days Forecast</h5>
                                        <Swiper
                                            slidesPerView={5}
                                            spaceBetween={10}
                                            // pagination={{
                                            //     clickable: true,
                                            // }}
                                            // modules={[Pagination]}
                                            className="mySwiper ten-day-forecast"
                                        >
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Today</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                        <div className="temparature-box-content">
                                                            <p>Mostly sunny</p>
                                                            <p className="mt-2"><span className="main-temp-shadow me-2"><img src={require("../../assets/images/drop.svg").default} className="" alt="icons" /></span>Humidity 26%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Sat 20</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Sun 21</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Mon 22</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Tue 23</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Wed 24</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'> Wed 24</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="weather-outer-section">
                                <div className="property-weather-box">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p><img src={require("../../assets/images/property-icon.svg").default} className="" alt="icons" /> Property Name</p>
                                        <p><b>GA</b></p>
                                    </div>
                                    <div className="temparature-box-outer">
                                        <div className="temparature-box-inner">
                                            <img src={require("../../assets/images/scattered-1.png")} className="me-2" alt="icons" />
                                            <div className="temparature-box-outer-text">
                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                            </div>
                                        </div>
                                        <div className="temparature-box-content">
                                            <p>Scattered Thunderstorm</p>
                                            <p className="mt-2">Feels like 39°</p>
                                        </div>
                                    </div>
                                    <div className="air-quality-outer">
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-16.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Wind</p>
                                                <h6>74 mp/h</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-5.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Humidity</p>
                                                <h6>26%</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="line"></hr>
                                <div className="property-weather-box">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p><img src={require("../../assets/images/property-icon.svg").default} className="" alt="icons" /> Property Name</p>
                                        <p><b>GA</b></p>
                                    </div>
                                    <div className="temparature-box-outer">
                                        <div className="temparature-box-inner">
                                            <img src={require("../../assets/images/scattered-2.png")} className="me-2" alt="icons" />
                                            <div className="temparature-box-outer-text">
                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                            </div>
                                        </div>
                                        <div className="temparature-box-content">
                                            <p>Hail Storm</p>
                                            <p className="mt-2">Feels like 39°</p>
                                        </div>
                                    </div>
                                    <div className="air-quality-outer">
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-16.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Wind</p>
                                                <h6>74 mp/h</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-5.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Humidity</p>
                                                <h6>26%</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="line"></hr>
                                <div className="property-weather-box">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p><img src={require("../../assets/images/property-icon.svg").default} className="" alt="icons" /> Property Name</p>
                                        <p><b>GA</b></p>
                                    </div>
                                    <div className="temparature-box-outer">
                                        <div className="temparature-box-inner">
                                            <img src={require("../../assets/images/scattered-3.png")} className="me-2" alt="icons" />
                                            <div className="temparature-box-outer-text">
                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                            </div>
                                        </div>
                                        <div className="temparature-box-content">
                                            <p>Scattered Thunderstorm</p>
                                            <p className="mt-2">Feels like 39°</p>
                                        </div>
                                    </div>
                                    <div className="air-quality-outer">
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="line"></hr>
                                <div className="property-weather-box">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p><img src={require("../../assets/images/property-icon.svg").default} className="" alt="icons" /> Property Name</p>
                                        <p><b>GA</b></p>
                                    </div>
                                    <div className="temparature-box-outer">
                                        <div className="temparature-box-inner">
                                            <img src={require("../../assets/images/scattered-1.png")} className="me-2" alt="icons" />
                                            <div className="temparature-box-outer-text">
                                                <h5 className="temp-text">32<span className="tem-icon">&#x2109;</span></h5>
                                            </div>
                                        </div>
                                        <div className="temparature-box-content">
                                            <p>Scattered Thunderstorm</p>
                                            <p className="mt-2">Feels like 39°</p>
                                        </div>
                                    </div>
                                    <div className="air-quality-outer">
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                        <div className="air-quality-box">
                                            <span>
                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                            </span>
                                            <div className="air-content">
                                                <p>Air Quality</p>
                                                <h6>86</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* weather summary section end */}
            </section>
        </div>
    )

}
export default WeatherDetail;