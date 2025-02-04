import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import { Grid, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FromPage from "./FromPage";
import ToPage from "./ToPage";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

function HomePage() {
    const [tabValue, setTabValue] = useState(0);
    const [animationClass, setAnimationClass] = useState("enter");
    const [fromLocation, setFromLocation] = useState("Select From");
    const [toLocation, setToLocation] = useState("Select To");
    const [showFromPage, setShowFromPage] = useState(false);
    const [showToPage, setShowToPage] = useState(false);
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const state = location.state || {};
        const from = state.from;
        const to = state.to;
        if (from) setFromLocation(from);
        if (to) setToLocation(to);
    }, [location]);

    const handleTabChange = (newValue) => {
        setAnimationClass("exit");
        setTimeout(() => {
            setTabValue(newValue);
            setAnimationClass("enter");
        }, 300);
    };

    const handleFromClick = () => {
        navigate("/from", { state: { to: toLocation }, replace: true });
        window.location.reload();
    };

    const handleToClick = () => {
        navigate("/to", { state: { from: fromLocation }, replace: true });
        window.location.reload();
    };

    const handleFromSelect = (location) => {
        setFromLocation(location);
        setShowFromPage(false);
    };

    const handleToSelect = (location) => {
        setToLocation(location);
        setShowToPage(false);
    };

    const handleSearch = () => {
        if (fromLocation === "Select From" || toLocation === "Select To") {
            setError("Please select both From and To locations.");
        } else {
            setError("");
            navigate("/results", { state: { from: fromLocation, to: toLocation }, replace: true });
            window.location.reload();
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
                    {/* Form Section */}
                    {tabValue === 0 && (
                        <div className={`home_form ${animationClass}`}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <div className="form-box">
                                        <div className="form-section" onClick={handleFromClick}>
                                            <h2>From</h2>
                                            <p>{fromLocation}</p>
                                            <span>IN NSA</span>
                                        </div>
                                        <div className="form-section" onClick={handleToClick}>
                                            <h2>To</h2>
                                            <p>{toLocation}</p>
                                            <span>GB SOU</span>
                                        </div>
                                    </div>
                                </Grid>
                                {error && (
                                    <Grid item xs={12}>
                                        <p className="error-message">{error}</p>
                                    </Grid>
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Origin"
                                        variant="outlined"
                                        value="Mumbai (INBOM)"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Destination"
                                        variant="outlined"
                                        value="New York (USNYC)"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Product"
                                        variant="outlined"
                                        value="Mango"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Container Type"
                                        variant="outlined"
                                        value="20GP"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Loading Location"
                                        variant="outlined"
                                        value="Pune, Maharashtra"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Arrival Date"
                                        variant="outlined"
                                        value="15 Feb 2025, Saturday"
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
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
                    speed={800} >
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
                </div>
            </div>
            <div className="home-img-sec">
                <div className="container">
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
                </div>
            </div>
        </div>
    );
}

export default HomePage;
