import React, { useState, useEffect, useContext } from "react";
import "../assets/css/fromPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { LocationContext } from "../context/LocationContext";
import { fetchPorts } from "../api/ports";
import config from "../api/config";  

function FromPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const { setFromLocation } = useContext(LocationContext);
    const [ports, setPorts] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [error, setError] = useState("");
    const [availablePorts, setAvailablePorts] = useState([]);

    useEffect(() => {
        const getPorts = async () => {
            const { from } = await fetchPorts();
            if (from.length === 0) {
                setError("No ports found.");
            } else {
                setError("");
            }
            setPorts(from);
        };
        getPorts();

        // Retrieve recent searches from localStorage
        const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
        if (storedSearches.length > 0) {
            setRecentSearches(storedSearches); 
        }

        // Fetch available ports from the search API
        const fetchAvailablePorts = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/search`);
                const data = await response.json();
                const availableFromPorts = data.map(item => item.from);
                setAvailablePorts(availableFromPorts);
            } catch (error) {
                console.error('Error fetching available ports:', error);
            }
        };
        fetchAvailablePorts();
    }, []);

    const handleSelect = (selectedPort) => {
        setFromLocation({ name: selectedPort.portname, code: selectedPort.code });

        // Update recent searches (ensure unique entries & limit to 4)
        let updatedSearches = [
            selectedPort,
            ...recentSearches.filter(item => item.code !== selectedPort.code)
        ];
        if (updatedSearches.length > 4) {
            updatedSearches = updatedSearches.slice(0, 4);
        }
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

        const state = location.state || {};
        const to = state.to;
        navigate("/", { state: { from: selectedPort.portname, to }, replace: true });
    };

    const handleBackClick = () => {
        const state = location.state || {};
        navigate("/", { state, replace: true });
    };

    const filteredPorts = ports.filter(port =>
        port.portname && port.portname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isPortAvailable = (portCode) => availablePorts.includes(portCode);

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

                {/* Show Recent Search only when there is data */}
                {recentSearches.length > 0 && (
                    <>
                        <h2>Recent Search</h2>
                        <div className="from-page-inner">
                            <ul>
                                {recentSearches.map((port, index) => (
                                    <li key={index} onClick={() => handleSelect(port)}>
                                        <div>
                                            <h2>{port.portname}</h2>
                                            <p>India</p>
                                        </div>
                                        <div style={{ textAlign: "end" }}>
                                            <span>{port.code}</span>
                                            <p style={{ color: isPortAvailable(port.code) ? 'green' : 'red', fontWeight:isPortAvailable(port.code) ? 'bold' : 'normal'  }}>
                                                {isPortAvailable(port.code) ? "Available" : "N/A"}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <h2>Popular Search</h2>
                <div className="from-page-inner">
                    {filteredPorts.length > 0 ? (
                        <ul>
                            {filteredPorts.map((port) => (
                                <li key={port.code} onClick={() => handleSelect(port)}>
                                    <div>
                                        <h2>{port.portname}</h2>
                                        <p>India</p>
                                    </div>
                                    <div style={{ textAlign: "end" }}>
                                        <span>{port.code}</span>
                                        <p style={{ color: isPortAvailable(port.code) ? 'green' : 'red' , fontWeight:isPortAvailable(port.code) ? 'bold' : 'normal'  }}>
                                            {isPortAvailable(port.code) ? "Available" : "N/A"}
                                        </p>
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



