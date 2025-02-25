import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const getInitialState = (key, defaultValue) => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error parsing ${key} from localStorage`, error);
            return defaultValue;
        }
    };

    const [fromLocation, setFromLocation] = useState(() => getInitialState('fromLocation', { name: "Select From", code: "" }));
    const [toLocation, setToLocation] = useState(() => getInitialState('toLocation', { name: "Select To", code: "" }));
    const [results, setResults] = useState(() => getInitialState('results', []));
    const [selectedResult, setSelectedResult] = useState(() => getInitialState('selectedResult', null));
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
        localStorage.setItem('fromLocation', JSON.stringify(fromLocation));
    }, [fromLocation]);

    useEffect(() => {
        localStorage.setItem('toLocation', JSON.stringify(toLocation));
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


