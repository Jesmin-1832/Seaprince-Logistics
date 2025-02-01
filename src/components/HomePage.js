import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import { Grid, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FromPage from "./FromPage";
import ToPage from "./ToPage";

function HomePage() { 
    const [tabValue, setTabValue] = useState(0);
    const [animationClass, setAnimationClass] = useState("enter");
    const [fromLocation, setFromLocation] = useState("Select From");
    const [toLocation, setToLocation] = useState("Select To");
    const [showFromPage, setShowFromPage] = useState(false);
    const [showToPage, setShowToPage] = useState(false);

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
    };

    const handleToClick = () => {
        navigate("/to", { state: { from: fromLocation }, replace: true });
    };

    const handleFromSelect = (location) => {
        setFromLocation(location);
        setShowFromPage(false);
    };

    const handleToSelect = (location) => {
        setToLocation(location);
        setShowToPage(false);
    };

    return (
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
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth>
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
    );
}

export default HomePage;
