import React, { useState } from "react";
import "../assets/css/fromPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FromPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const locations = [
        { name: "Nhava Sheva", country: "India, Maharashtra", code: "IN NSA" },
        { name: "Mumbai", country: "India, Maharashtra", code: "IN BOM" },
        { name: "Chennai", country: "India, Tamil Nadu", code: "IN MAA" },
    ];

    const handleSelect = (fromLocation) => {
        const state = location.state || {};
        const to = state.to;
        navigate("/", { state: { from: fromLocation, to }, replace: true });
    };

    const handleBackClick = () => {
        const state = location.state || {};
        navigate("/", { state, replace: true });
    };

    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="to-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>POL</h2>
            </div>
            <div className="to-page-content">
                <input
                    type="text"
                    placeholder="Search location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="to-page-inner">
                    <ul>
                        {filteredLocations.map((location) => (
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
                </div>
            </div>
        </div>
    );
}

export default FromPage;
