import React, { useState, useEffect, useContext } from "react";
import "../assets/css/home.css";
import { Grid, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FromPage from "./FromPage";
import ToPage from "./ToPage";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LocationContext } from '../context/LocationContext';
import config from "../api/config";  

function HomePage() {
    const [tabValue, setTabValue] = useState(0);
    const [animationClass, setAnimationClass] = useState("enter");
    const [showFromPage, setShowFromPage] = useState(false);
    const [showToPage, setShowToPage] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const { fromLocation, setFromLocation, toLocation, setToLocation } = useContext(LocationContext);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(timer);
    }, []);

    const handleTabChange = (newValue) => {
        setAnimationClass("exit");
        setTimeout(() => {
            setTabValue(newValue);
            setAnimationClass("enter");
        }, 300);
    };

    const handleFromClick = () => {
        navigate("/from", { state: { to: { name: toLocation.name, code: toLocation.code } }, replace: true });
    };

    const handleToClick = () => {
        navigate("/to", { state: { from: { name: fromLocation.name, code: fromLocation.code } }, replace: true });
    };

    const handleFromSelect = (location) => {
        setFromLocation(location);
        navigate("/", { replace: true });
    };

    const handleToSelect = (location) => {
        setToLocation(location);
        navigate("/", { replace: true });
    };

    const handleSearch = async () => {
        if (fromLocation.name === "Select From" || toLocation.name === "Select To") { 
            setError("Please select both From and To locations.");
        } else {
            setError("");
            const searchData = {
                from: fromLocation.code,
                to: toLocation.code
            };
            const queryString = new URLSearchParams(searchData).toString();
            try {
                const response = await fetch(`${config.apiUrl}/api/search?${queryString}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        navigate("/results", { state: { fromName: fromLocation.name, fromCode: fromLocation.code, toName: toLocation.name, toCode: toLocation.code, results: data }, replace: true });
                    } else {
                        setError("No results found for the selected locations.");
                    }
                } else {
                    throw new Error("Received non-JSON response");
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setError("An error occurred while fetching results.");
            }
        }
    };

    const swiperItems = [
        { id: 1, heading: "Why Choose Us", isFirst: true },
        { id: 2, image: require("../assets/image/why-choose-icon1.png"), heading: "Experience", description: "30+ Years of Collective Experience", isFirst: false },
        { id: 3, image: require("../assets/image/why-choose-icon2.png"), heading: "Network", description: "Extensive Global Network", isFirst: false },
        { id: 4, image: require("../assets/image/why-choose-icon3.png"), heading: "Transportation", description: "Specialized Goods Transportation", isFirst: false },
        { id: 5, image: require("../assets/image/why-choose-icon4.png"), heading: "Pricing", description: "Cost-Effective Pricing", isFirst: false },
        { id: 6, image: require("../assets/image/why-choose-icon5.png"), heading: "Licence", description: "Licensed and government approved", isFirst: false },
        { id: 7, image: require("../assets/image/why-choose-icon6.png"), heading: "Delivery", description: "On-time and Safe Delivery", isFirst: false }
    ];

    return (
        <div className="home-page">
            <div className="home_content">
                <div className="container">
                    {/* Custom Tabs Section */}
                    {loading ? (
                        <div className="home_tabs">
                            <Skeleton height={40} baseColor="transparent" highlightColor="#ffffffab" />
                        </div>
                    ) : (
                        <div className="home_tabs">
                            <div className="tab-buttons">
                                <button
                                    className={`tab-btn ${tabValue === 0 ? "active" : ""}`}
                                    onClick={() => handleTabChange(0)}
                                >
                                    End To End
                                </button>
                                <button
                                    className={`tab-btn ${tabValue === 1 ? "active" : ""}`}
                                    onClick={() => handleTabChange(1)}
                                >
                                    Port To Port
                                </button>
                                <div className="tab-indicator" style={{ transform: `translateX(${tabValue * 100}%)` }} />
                            </div>
                        </div>
                    )}
                    {/* Form Section */}
                    {loading ? (
                        <div className="home_form">
                            <Skeleton height={130} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        </div>
                    ) : (
                        <>
                            {tabValue === 0 && (
                                <div className={`home_form ${animationClass}`}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <div className="form-box">
                                                <div className="form-section" onClick={handleFromClick}>
                                                    <h2>From</h2>
                                                    <p>{fromLocation.name}</p>
                                                    <span>{fromLocation.code}</span>
                                                </div>
                                                <div className="form-section" onClick={handleToClick}>
                                                    <h2>To</h2>
                                                    <p>{toLocation.name}</p>
                                                    <span>{toLocation.code}</span>
                                                </div>
                                            </div>
                                        </Grid>
                                        {error && (
                                            <p className="error-message">{error}</p>
                                        )}
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div className={`home_form ${animationClass}`}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <div className="form-box">
                                                <div className="form-section">
                                                    <h2>From</h2>
                                                    <p>N/A</p>
                                                    <span>N/A</span>
                                                </div>
                                                <div className="form-section">
                                                    <h2>To</h2>
                                                    <p>N/A</p>
                                                    <span>N/A</span>
                                                </div>
                                            </div>
                                        </Grid>
                                        {error && (
                                            <p className="error-message">{error}</p>
                                        )}
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" fullWidth>
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </>
                    )}
                    {showFromPage && (
                        <div className="overlay">
                            <div className="overlay-content">
                                <FromPage onSelect={handleFromSelect} />
                            </div>
                        </div>
                    )}
                    {showToPage && (
                        <div className="overlay">
                            <div className="overlay-content">
                                <ToPage onSelect={handleToSelect} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="home_carousel">
                <div className="container">
                    {loading ? (
                        <Skeleton height={250} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                    ) : (
                        <Swiper
                            grabCursor={true}
                            freeMode={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.2,
                                },
                                320: { slidesPerView: 1.5 },
                                400: { slidesPerView: 1.8 },
                                425: { slidesPerView: 2 },
                                500: { slidesPerView: 2.2 },
                            }}
                            speed={800}
                        >
                            {swiperItems.map(item => (
                                <SwiperSlide key={item.id}>
                                    {item.isFirst ? (
                                        <div className="swiper-item-content">
                                            <p>{item.heading}</p>
                                        </div>
                                    ) : (
                                        <div className="swiper-item">
                                            <img src={item.image} alt={item.heading} />
                                            <h2>{item.heading}</h2>
                                            <p>{item.description}</p>
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
            <div className="home-img-sec">
                <div className="container">
                    {loading ? (
                        <>
                            <div className="content-wrapper">
                                <div className="text-content">
                                    <Skeleton height={20} width={150} baseColor="transparent" highlightColor="#ffffffab" />
                                    <Skeleton height={20} width={130} baseColor="transparent" highlightColor="#ffffffab" />
                                    <Skeleton height={20} width={140} baseColor="transparent" highlightColor="#ffffffab" />
                                    <Skeleton height={20} width={100} baseColor="transparent" highlightColor="#ffffffab" />
                                </div>
                                <div className="image-content">
                                    <Skeleton borderRadius={20} height={150} width={150} baseColor="transparent" highlightColor="#ffffffab" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Heading</h2>
                            <div className="content-wrapper">
                                <div className="text-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                        condimentum tortor sem.
                                    </p>
                                </div>
                                <div className="image-content">
                                    <img src={require("../assets/image/person.png")} alt="" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;


