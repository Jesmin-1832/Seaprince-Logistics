import React, { useState, useContext } from "react";
import "../assets/css/toPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { LocationContext } from '../context/LocationContext';

function ToPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const { setToLocation } = useContext(LocationContext);

    const recentLocations = [
        { name: "Southampton", country: "United Kingdom, England", code: "SA JED" },
        { name: "New York", country: "United States, New York", code: "NYC" },
        { name: "London", country: "United Kingdom, England", code: "LON" },
    ];

    const popularLocations = [
        { name: "Los Angeles", country: "United States, California", code: "LAX" },
        { name: "San Francisco", country: "United States, California", code: "SFO" },
        { name: "Chicago", country: "United States, Illinois", code: "ORD" },
        { name: "Miami", country: "United States, Florida", code: "MIA" },
    ];

    const handleSelect = (toLocation) => {
        setToLocation(toLocation);
        const state = location.state || {};
        const from = state.from;
        navigate("/", { state: { from, to: toLocation }, replace: true });
    };

    const handleBackClick = () => {
        const state = location.state || {};
        navigate("/", { state, replace: true });
    };

    const filteredRecentLocations = recentLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPopularLocations = popularLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="to-page">
            <div className="to-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>POD</h2>
            </div>
            <div className="to-page-content">
                <h2>Select POD</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Type Port Of Discharge"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <SearchRoundedIcon />
                </div>
             
                <h2>Recent Search</h2>
                <div className="to-page-inner">
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
                        <p className="noDataFound">POD Not Found</p>
                    )}
                </div>
                
                <h2>Popular Search</h2>
                <div className="to-page-inner">
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
                        <p className="noDataFound">POD Not Found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ToPage;
