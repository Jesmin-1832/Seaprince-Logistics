import React, { useState, useEffect, useContext } from "react";
import "../assets/css/toPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { LocationContext } from "../context/LocationContext";
import { fetchPorts } from "../api/ports";
import config from "../api/config";  

function ToPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const { setToLocation } = useContext(LocationContext);
    const [ports, setPorts] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [error, setError] = useState("");
    const [availablePorts, setAvailablePorts] = useState([]);

    useEffect(() => {
        const getPorts = async () => {
            const { to } = await fetchPorts();
            if (to.length === 0) {
                setError("No ports found.");
            } else {
                setError("");
            }
            setPorts(to);
        };
        getPorts();

        // Retrieve recent searches from localStorage
        const storedSearches = JSON.parse(localStorage.getItem("recentToSearches")) || [];
        if (storedSearches.length > 0) {
            setRecentSearches(storedSearches);
        }

        // Fetch available ports from the search API
        const fetchAvailablePorts = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/search`);
                const data = await response.json();
                const availableToPorts = data.map(item => item.to);
                setAvailablePorts(availableToPorts);
            } catch (error) {
                console.error('Error fetching available ports:', error);
            }
        };
        fetchAvailablePorts();
    }, []);

    const handleSelect = (selectedPort) => {
        setToLocation({ name: selectedPort.portname, code: selectedPort.code });

        // Update recent searches (ensure unique entries & limit to 4)
        let updatedSearches = [
            selectedPort,
            ...recentSearches.filter(item => item.code !== selectedPort.code)
        ];
        if (updatedSearches.length > 4) {
            updatedSearches = updatedSearches.slice(0, 4);
        }
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentToSearches", JSON.stringify(updatedSearches));

        const state = location.state || {};
        const from = state.from;
        navigate("/", { state: { from, toName: selectedPort.portname, toCode: selectedPort.code }, replace: true });
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

                {/* Show Recent Search only when there is data */}
                {recentSearches.length > 0 && (
                    <>
                        <h2>Recent Search</h2>
                        <div className="to-page-inner">
                            <ul>
                                {recentSearches.map((port, index) => (
                                    <li key={index} onClick={() => handleSelect(port)}>
                                        <div>
                                            <h2>{port.portname}</h2>
                                            <p>{port.country_name}</p>
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
                <div className="to-page-inner">
                    {filteredPorts.length > 0 ? (
                        <ul>
                            {filteredPorts.map((port) => (
                                <li key={port.code} onClick={() => handleSelect(port)}>
                                    <div>
                                        <h2>{port.portname}</h2>
                                        <p>{port.country_name}</p>
                                    </div>
                                    <div style={{ textAlign: "end" }}>
                                        <span>{port.code}</span>
                                        <p style={{ color: isPortAvailable(port.code) ? 'green' : 'red' , fontWeight:isPortAvailable(port.code) ? 'bold' : 'normal' }}>
                                            {isPortAvailable(port.code) ? "Available" : "N/A"}
                                        </p>
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



