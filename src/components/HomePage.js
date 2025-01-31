import React, { useState } from "react";
import "../assets/css/home.css";
import { Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";

function HomePage() {
    const [tabValue, setTabValue] = useState(0);
    const [animationClass, setAnimationClass] = useState("enter");
    const [fromLocation, setFromLocation] = useState("Nhava Sheva (INNSA)");
    const [toLocation, setToLocation] = useState("Southampton (GBSOU)");

    const handleTabChange = (newValue) => {
        setAnimationClass("exit");
        setTimeout(() => {
            setTabValue(newValue);
            setAnimationClass("enter");
        }, 300); // Match the duration of the fadeOut animation
    };

    const handleFromChange = (event) => {
        setFromLocation(event.target.value);
    };

    const handleToChange = (event) => {
        setToLocation(event.target.value);
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
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>From</InputLabel>
                                    <Select
                                        value={fromLocation}
                                        onChange={handleFromChange}
                                        label="From"
                                    >
                                        <MenuItem value="Nhava Sheva (INNSA)">Nhava Sheva (INNSA)</MenuItem>
                                        <MenuItem value="Mumbai (INBOM)">Mumbai (INBOM)</MenuItem>
                                        <MenuItem value="Chennai (INMAA)">Chennai (INMAA)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>To</InputLabel>
                                    <Select
                                        value={toLocation}
                                        onChange={handleToChange}
                                        label="To"
                                    >
                                        <MenuItem value="Southampton (GBSOU)">Southampton (GBSOU)</MenuItem>
                                        <MenuItem value="New York (USNYC)">New York (USNYC)</MenuItem>
                                        <MenuItem value="Los Angeles (USLAX)">Los Angeles (USLAX)</MenuItem>
                                    </Select>
                                </FormControl>
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
            </div>
        </div>
    );
}

export default HomePage;
