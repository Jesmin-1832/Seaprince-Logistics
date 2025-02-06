import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [fromLocation, setFromLocation] = useState(() => localStorage.getItem('fromLocation') || "Select From");
    const [toLocation, setToLocation] = useState(() => localStorage.getItem('toLocation') || "Select To");
    const [results, setResults] = useState(() => JSON.parse(localStorage.getItem('results')) || []);
    const [selectedResult, setSelectedResult] = useState(() => JSON.parse(localStorage.getItem('selectedResult')) || null);
    const [recentLocations, setRecentLocations] = useState([
        { name: "Nhava Sheva", country: "India, Maharashtra", code: "IN NSA" },
        { name: "Mumbai", country: "India, Maharashtra", code: "IN BOM" },
        { name: "Pune", country: "India, Maharashtra", code: "IN PNQ" },
    ]);
    const [popularLocations, setPopularLocations] = useState([
        { name: "Chennai", country: "India, Tamil Nadu", code: "IN MAA" },
        { name: "Kolkata", country: "India, West Bengal", code: "IN CCU" },
        { name: "Delhi", country: "India, Delhi", code: "IN DEL" },
        { name: "Bangalore", country: "India, Karnataka", code: "IN BLR" },
    ]);

    useEffect(() => {
        localStorage.setItem('fromLocation', fromLocation);
    }, [fromLocation]);

    useEffect(() => {
        localStorage.setItem('toLocation', toLocation);
    }, [toLocation]);

    useEffect(() => {
        localStorage.setItem('results', JSON.stringify(results));
    }, [results]);

    useEffect(() => {
        localStorage.setItem('selectedResult', JSON.stringify(selectedResult));
    }, [selectedResult]);

    return (
        <LocationContext.Provider value={{ 
            fromLocation, setFromLocation, 
            toLocation, setToLocation, 
            results, setResults, 
            selectedResult, setSelectedResult,
            recentLocations, setRecentLocations,
            popularLocations, setPopularLocations
        }}>
            {children}
        </LocationContext.Provider>
    );
};
