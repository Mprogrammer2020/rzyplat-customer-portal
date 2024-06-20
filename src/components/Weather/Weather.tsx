import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Weather.css";
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import moment from "moment";

interface WeatherWarning {
    title: string;
    description: string;
    level: string;
    alertTime: string;
    weather: {
        windSpeed: number;
    };
}

interface CurrentWeather {
    weatherTime: string;
    tempratureFarenheit: number;
    tempratureDescription: string;
    tempratureFeelsLike: number;
    airQuality: string;
    windSpeed: number;
    humidity: number;
    visibility: number;
    pressure: number;
    dewPoint: number;
}

interface HourlyWeather {
    weatherTime: string;
    tempratureFarenheit: number;
    tempratureDescription: string;
    tempratureFeelsLike: number;
}

interface TenDaysWeather {
    weatherDate: string;
    maxTempratureInFarenheit: number;
    minTempratureInFarenheit: number;
    tempratureDescription: string;
}

interface PropertyWeather {
    propertyName: string;
    tempratureFarenheit: number;
    tempratureDescription: string;
    tempratureFeelsLike: number;
    airQuality: string;
    windSpeed: number;
    humidity: number;
}

function WeatherDetail() {
    const [weatherWarning, setWeatherWarning] = useState<WeatherWarning | null>(null);
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
    const [currentHourlyWeather, setCurrentHourlyWeather] = useState<HourlyWeather[]>([]);
    const [currentTenDaysWeather, setCurrentTenDaysWeather] = useState<TenDaysWeather[]>([]);
    const [currentPropertyWeather, setCurrentPropertyWeather] = useState<PropertyWeather[]>([]);
    const [propertyWeather, setPropertyWeather] = useState<TenDaysWeather | null>(null);

    useEffect(() => {
        getWarningWeather();
        getCurrentWeather();
        getCurrentHourlyWeather();
        getCurrenTenDaysWeather();
        getCurrenPropertyWeather();
    }, []);

    async function getWarningWeather() {
        try {
            const response = await APIServices.HeatWather();
            if (response.status === 200) {
                let responseData = response.data as WeatherWarning;
                setWeatherWarning(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    async function getCurrentWeather() {
        try {
            const response = await APIServices.currentWather();
            if (response.status === 200) {
                console.log("currentWeather-------->",response)
                let responseData = response.data as CurrentWeather;
                setCurrentWeather(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    async function getCurrentHourlyWeather() {
        try {
            const response = await APIServices.currentHourlyWather();
            if (response.status === 200) {
                let responseData = response.data as HourlyWeather[];
                setCurrentHourlyWeather(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    async function getCurrenTenDaysWeather() {
        try {
            const response = await APIServices.currentTenDaysWather();
            if (response.status === 200) {
                let responseData = response.data as TenDaysWeather[];
                setPropertyWeather(responseData.shift() || null);
                setCurrentTenDaysWeather(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    async function getCurrenPropertyWeather() {
        try {
            const response = await APIServices.currentPropertyWather();
            if (response.status === 200) {
                let responseData = response.data as PropertyWeather[];
                setCurrentPropertyWeather(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    const formatDate = (dateString: string) => {
        const inputDate = moment(dateString);
        const today = moment();

        if (inputDate.isSame(today, 'day')) {
            return 'Today';
        } else {
            return inputDate.format('ddd DD');
        }
    };

    return (
        <div>
            <section className='customer-section'>
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
                                                <h5 className='heading-main text-dark'>Current Weather <span>{currentWeather?.weatherTime ? moment(currentWeather?.weatherTime).format("LT") : "-"}</span></h5>
                                                <div className="outer-weather-main-box">
                                                    {/* <h5 className="temp-text">
                                                        <img src={require("../../assets/images/air-1.png")} className="me-2" alt="icons" />{currentWeather?.tempratureFarenheit ? currentWeather?.tempratureFarenheit : "-"} <span> &#x2109;</span></h5> */}
                                                    <h5 className="temp-text">
                                                        <img src={currentWeather?.tempratureDescription == "Rainy" ? require("../../assets/images/scattered-1.png") : currentWeather?.tempratureDescription == "Scattered Thunderstorm" ? require("../../assets/images/scattered-3.png") : currentWeather?.tempratureDescription == "Hail Storm" ? require("../../assets/images/scattered-2.png") : require("../../assets/images/air-1.png")} className="me-2" alt="icons" />
                                                        {currentWeather?.tempratureFarenheit ? currentWeather?.tempratureFarenheit : "-"} <span className="tem-icon main"> &#x2109;</span>
                                                    </h5>
                                                    <div className="weather-main-txt">
                                                        <p>{currentWeather?.tempratureDescription ? currentWeather?.tempratureDescription : "-"}</p>
                                                        <span className="small-text">Feels like {currentWeather?.tempratureFeelsLike ? currentWeather?.tempratureFeelsLike + "°" : "-"}</span>
                                                    </div>
                                                </div>
                                                <div className="air-quality-outer">
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Air Quality</p>
                                                            <h6>{currentWeather?.airQuality ? currentWeather?.airQuality : "-"}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box active">
                                                        <span>
                                                            <img src={require("../../assets/images/air-16.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Wind</p>
                                                            <h6>{currentWeather?.windSpeed ? currentWeather?.windSpeed + " mp/h" : "-"} </h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-5.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Humidity</p>
                                                            <h6>{currentWeather?.humidity ? currentWeather?.humidity + " %" : "-"}</h6>
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
                                                            <h6>{currentWeather?.visibility ? currentWeather?.visibility + " km" : "-"}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-3.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Pressure</p>
                                                            <h6>{currentWeather?.pressure ? currentWeather?.pressure + " mb" : "-"}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-box">
                                                        <span>
                                                            <img src={require("../../assets/images/air-6.svg").default} className="" alt="icons" />
                                                        </span>
                                                        <div className="air-content">
                                                            <p>Dew Point</p>
                                                            <h6>{currentWeather?.dewPoint ? currentWeather?.dewPoint + "°" : "-"}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="hurricane-warning-box">
                                                <h5 className="red-text"><img src={require("../../assets/images/red-weather.svg").default} className="me-2" alt="icons" />{weatherWarning?.title ? weatherWarning?.title : "-"}</h5>
                                                <p>{weatherWarning?.description ? weatherWarning?.description : "-"}</p>
                                                <span className="alert-warning">Alert Level: {weatherWarning?.level ? weatherWarning?.level : "-"}</span>
                                                <span className="alert-warning">Date: {weatherWarning?.alertTime ? moment(weatherWarning?.alertTime).format("DD-MM-YYYY") : "-"}</span>
                                                <span className="alert-warning">Time: {weatherWarning?.alertTime ? moment(weatherWarning?.alertTime).format('LT') : "-"}</span>
                                                <span className="alert-warning">Wind: {weatherWarning?.weather?.windSpeed ? weatherWarning?.weather?.windSpeed + " mph" : "-"}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr className="line"></hr>

                                    <div className="forecast-weather mt-3">
                                        <h5 className='heading-main text-dark mb-3'> Hourly Forecast</h5>
                                        <Swiper
                                            slidesPerView={8}
                                            spaceBetween={8}
                                            className="mySwiper under-swiper"

                                        >
                                            {currentHourlyWeather?.length > 0 ?
                                                currentHourlyWeather?.map((item, index) => {
                                                    return (

                                                        <SwiperSlide>

                                                            <div className="forecast-box">
                                                                <h5 className='heading-main text-dark mb-3'> {item?.weatherTime ? moment(item?.weatherTime).format('LT') : "-"}</h5>
                                                                <img src={item?.tempratureDescription == "Hail Storm" ? require("../../assets/images/heal-Strom-2.png") : item?.tempratureDescription == "Scattered Thunderstorm" ? require("../../assets/images/scatteredthunder.png") : item?.tempratureDescription == "Partly Sunny" ? require("../../assets/images/weather-2.png") : item?.tempratureDescription == "Sunny" ? require("../../assets/images/weather-3.png") : require("../../assets/images/cloud-1.png")} className="" alt="icons" />
                                                                <h5 className="temp-text">{item?.tempratureFarenheit ? item?.tempratureFarenheit : "-"}&deg;</h5>
                                                                <p><img src={require("../../assets/images/drop.svg").default} className="me-2" alt="icons" />{item?.tempratureFeelsLike ? item?.tempratureFeelsLike + "%" : "-"}</p>
                                                                <p className="mt-3">{item?.tempratureDescription ? item?.tempratureDescription : "-"}</p>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })
                                                :
                                                <p> No Hourly Forecast</p>
                                            }
                                        </Swiper>
                                    </div>
                                    <hr className="line"></hr>
                                    <div className="forecast-weather mt-3">
                                        <h5 className='heading-main text-dark mb-3'> 10 Days Forecast</h5>

                                        <Swiper
                                            slidesPerView={8}
                                            spaceBetween={8}
                                            className="mySwiper ten-day-forecast"
                                            breakpoints={{
                                                1500: {
                                                    slidesPerView: 6,
                                                },
                                                1600: {
                                                    slidesPerView: 7,
                                                },
                                                1700: {
                                                    slidesPerView: 8,
                                                },
                                            }}
                                        >
                                            <SwiperSlide>
                                                <div className="forecast-box ten-day-forecast-box">
                                                    <h5 className='heading-main text-dark'>{propertyWeather && propertyWeather?.weatherDate ? formatDate(propertyWeather?.weatherDate) : "-"}</h5>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={propertyWeather?.tempratureDescription == "Hail Storm" ?
                                                                require("../../assets/images/main-tem-3.png") :
                                                                propertyWeather?.tempratureDescription == "Partly Sunny" ? require("../../assets/images/main-tem-2.png") : propertyWeather?.tempratureDescription == "Scattered Thunderstorm" ? require("../../assets/images/main-tem-5.png") : propertyWeather?.tempratureDescription == "Sunny" ?
                                                                    require("../../assets/images/main-tem-1.png") : require("../../assets/images/main-tem-4.png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">{propertyWeather && propertyWeather?.maxTempratureInFarenheit ? propertyWeather?.maxTempratureInFarenheit : "-"}<span className="tem-icon">&#x2109;</span></h5>
                                                                <h5 className="temp-text">{propertyWeather && propertyWeather?.minTempratureInFarenheit ? propertyWeather?.minTempratureInFarenheit : "-"}<span className="tem-icon">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                        <div className="temparature-box-content">
                                                            <p>{propertyWeather && propertyWeather?.tempratureDescription ? propertyWeather?.tempratureDescription : "-"}</p>
                                                            <p className="mt-2"><span className="main-temp-shadow me-2"><img src={require("../../assets/images/drop.svg").default} className="" alt="icons" /></span>Humidity {propertyWeather && propertyWeather?.tempratureFeelsLike ? propertyWeather?.tempratureFeelsLike + "%" : "-"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            {currentTenDaysWeather?.length > 0 ?
                                                currentTenDaysWeather?.map((item, index) => {
                                                    return (
                                                        <>

                                                            <SwiperSlide>
                                                                <div className="forecast-box ten-day-forecast-box">
                                                                    <h5 className='heading-main text-dark'>{item?.weatherDate ? moment(item?.weatherDate).format('ddd DD') : "-"}</h5>
                                                                    <div className="temparature-box-outer">
                                                                        <div className="temparature-box-inner">
                                                                            <img src={item?.tempratureDescription == "Hail Storm" ? require("../../assets/images/main-tem-3.png") : item?.tempratureDescription == "Partly Sunny" ? require("../../assets/images/main-tem-2.png") : item?.tempratureDescription == "Scattered Thunderstorm" ? require("../../assets/images/main-tem-5.png") : item?.tempratureDescription == "Sunny" ? require("../../assets/images/main-tem-1.png") : require("../../assets/images/main-tem-2.png")} className="me-2" alt="icons" />
                                                                            <div className="temparature-box-outer-text">
                                                                                <h5 className="temp-text">{item?.maxTempratureInFarenheit || "-"}<span className="tem-icon">&#x2109;</span></h5>
                                                                                <h5 className="temp-text">{item?.minTempratureInFarenheit || "-"}<span className="tem-icon">&#x2109;</span></h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        </>
                                                    )
                                                })
                                                :
                                                <p> No 10 days Forecast</p>
                                            }
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="weather-outer-section">
                                {currentPropertyWeather?.length > 0 ?
                                    currentPropertyWeather?.map((propti, index) => {
                                        return (
                                            <>
                                                <div className="property-weather-box">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p><img src={require("../../assets/images/property-icon.svg").default} className="" alt="icons" /> Property Name</p>
                                                        <p><b>{propti?.propertyName || "-"}</b></p>
                                                    </div>
                                                    <div className="temparature-box-outer">
                                                        <div className="temparature-box-inner">
                                                            <img src={propti?.tempratureDescription == "Rainy" ? require("../../assets/images/scattered-1.png") : propti?.tempratureDescription == "Scattered Thunderstorm" ? require("../../assets/images/scattered-3.png") : propti?.tempratureDescription == "Hail Storm" ? require("../../assets/images/scattered-2.png") : require("../../assets/images/scattered-icon (1).png")} className="me-2" alt="icons" />
                                                            <div className="temparature-box-outer-text">
                                                                <h5 className="temp-text">{propti?.tempratureFarenheit || "-"}<span className="tem-icon main">&#x2109;</span></h5>
                                                            </div>
                                                        </div>
                                                        <div className="temparature-box-content">
                                                            <p>{propti?.tempratureDescription || "-"}</p>
                                                            <p className="mt-2 tem-icon">Feels like {propti?.tempratureFeelsLike + "°" || "-"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="air-quality-outer">
                                                        <div className="air-quality-box">
                                                            <span>
                                                                <img src={require("../../assets/images/air-main-1.svg").default} className="" alt="icons" />
                                                            </span>
                                                            <div className="air-content">
                                                                <p>Air Quality</p>
                                                                <h6>{propti?.airQuality || "-"}</h6>
                                                            </div>
                                                        </div>
                                                        <div className="air-quality-box active">
                                                            <span>
                                                                <img src={require("../../assets/images/air-16.svg").default} className="" alt="icons" />
                                                            </span>
                                                            <div className="air-content">
                                                                <p>Wind</p>
                                                                <h6>{propti?.windSpeed + "mp/h" || "-"}</h6>
                                                            </div>
                                                        </div>
                                                        <div className="air-quality-box">
                                                            <span>
                                                                <img src={require("../../assets/images/air-5.svg").default} className="" alt="icons" />
                                                            </span>
                                                            <div className="air-content">
                                                                <p>Humidity</p>
                                                                <h6>{propti?.humidity + "%" || "-"}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="line"></hr>
                                            </>
                                        )
                                    })
                                    :
                                    <>No Property Data available</>}
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
}

export default WeatherDetail;
