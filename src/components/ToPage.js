import React, { useState } from "react";
import "../assets/css/toPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ToPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const locations = [
        { name: "Southampton", country: "United Kingdom, England", code: "SA JED" },
        { name: "New York", country: "United States, New York", code: "NYC" },
        { name: "Los Angeles", country: "United States, California", code: "LAX" },
    ];

    const handleSelect = (toLocation) => {
        const state = location.state || {};
        const from = state.from;
        navigate("/", { state: { from, to: toLocation }, replace: true });
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
                <h2>POD</h2>
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

export default ToPage;
