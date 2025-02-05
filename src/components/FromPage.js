import React, { useState } from "react";
import "../assets/css/fromPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function FromPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const recentLocations = [
        { name: "Nhava Sheva", country: "India, Maharashtra", code: "IN NSA" },
        { name: "Mumbai", country: "India, Maharashtra", code: "IN BOM" },
        { name: "Pune", country: "India, Maharashtra", code: "IN PNQ" },
    ];

    const popularLocations = [
        { name: "Chennai", country: "India, Tamil Nadu", code: "IN MAA" },
        { name: "Kolkata", country: "India, West Bengal", code: "IN CCU" },
        { name: "Delhi", country: "India, Delhi", code: "IN DEL" },
        { name: "Bangalore", country: "India, Karnataka", code: "IN BLR" },
    ];

    const handleSelect = (fromLocation) => {
        const state = location.state || {};
        const to = state.to;
        navigate("/", { state: { from: fromLocation, to }, replace: true });
        window.location.reload();
    };

    const handleBackClick = () => {
        const state = location.state || {};
        navigate("/", { state, replace: true });
        window.location.reload();
    };

    const filteredRecentLocations = recentLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPopularLocations = popularLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="from-page">
            <div className="from-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>POL</h2>
            </div>
            <div className="from-page-content">
                <h2>Select POL</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Type Port Of Loading"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <SearchRoundedIcon />
                </div>
             
                <h2>Recent Search</h2>
                <div className="from-page-inner">
                    {filteredRecentLocations.length > 0 ? (
                        <ul>
                            {filteredRecentLocations.map((location) => (
                                <li key={location.code} onClick={() => handleSelect(location.name)}>
                                    <div>
                                        <h2>{location.name}</h2>
                                        <p>{location.country}</p>
                                    </div>
                                    <div>
                                        <span>{location.code}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="noDataFound">POL Not Found</p>
                    )}
                </div>
                
                <h2>Popular Search</h2>
                <div className="from-page-inner">
                    {filteredPopularLocations.length > 0 ? (
                        <ul>
                            {filteredPopularLocations.map((location) => (
                                <li key={location.code} onClick={() => handleSelect(location.name)}>
                                    <div>
                                        <h2>{location.name}</h2>
                                        <p>{location.country}</p>
                                    </div>
                                    <div>
                                        <span>{location.code}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="noDataFound">POL Not Found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FromPage;
