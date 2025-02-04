import React from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../assets/css/fullQuotePage.css";

function FullQuotePage() {
    const location = useLocation();
    const { result } = location.state || {};

    return (
        <div className="full-quote-page">
            <div className="full-quote-page-header">
                <ArrowBackIcon onClick={() => window.history.back()} />
                <h2>Full Quote Details</h2>
            </div>
            <div className="full-quote-page-content">
                {result ? (
                    <div className="quote-details">
                        <h2>{result.name}</h2>
                        <img src={result.imgSrc} alt="" />
                        <p>Start Date: {result.startDate}</p>
                        <p>End Date: {result.endDate}</p>
                        <p>Days: {result.days}</p>
                        <p>Stations: {result.stations}</p>
                        <p>Price: {result.price}</p>
                        <p>Containers Available: {result.containersAvailable}</p>
                    </div>
                ) : (
                    <p>No quote details available.</p>
                )}
            </div>
        </div>
    );
}

export default FullQuotePage;
