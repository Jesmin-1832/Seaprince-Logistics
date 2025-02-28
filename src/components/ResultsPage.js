import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../assets/css/resultsPage.css";
import { LocationContext } from '../context/LocationContext';
import ResultList from './ResultList';

function ResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fromLocation, toLocation, setSelectedResult } = useContext(LocationContext);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const fromCode = fromLocation.code;
                const toCode = toLocation.code;
                const response = await fetch(`https://app.seaprince.click4demos.co.in/api/search?from=${fromCode}&to=${toCode}`);

                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [fromLocation, toLocation]);

    const handleBackClick = () => {
        navigate("/", { state: { from: fromLocation, to: toLocation }, replace: true });
    };

    const handleFullQuoteClick = (result) => {
        setSelectedResult(result);
        navigate("/full-quote", { state: { fromName: fromLocation.name, fromCode: fromLocation.code, toName: toLocation.name, toCode: toLocation.code, selectedResult: result } });
    };

    const slides = [
        { title: "ATLANTIC IBIS", date: "05 Feb", day: "Wed" },
        { title: "C START VOYAG", date: "06 Feb", day: "Thu" },
        { title: "OCEAN BREEZE", date: "07 Feb", day: "Fri" },
    ];

    return (
        <div className="results-page">
            <div className="results-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>{fromLocation.name} To {toLocation.name}</h2>
            </div>
            <div className="results-page-content">
                <h2>Upcoming Vessels</h2>
                <Swiper grabCursor={true}
                    spaceBetween={10}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.2,
                        },
                        320: { slidesPerView: 1.5 },
                        400: { slidesPerView: 1.8 },
                        425: { slidesPerView: 2 },
                        500: { slidesPerView: 2.5 },
                    }}
                >
                    {loading ? (
                        Array(3).fill().map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className="slide-content">
                                    <Skeleton height={20} width={150} baseColor="transparent" highlightColor="#ffffffab" />
                                    <Skeleton height={20} width={100} baseColor="transparent" highlightColor="#ffffffab" />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="slide-content">
                                    <h3>{slide.title}</h3>
                                    <p><span>{slide.date}</span> | <span>{slide.day}</span></p>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>

                <h2>Search Result</h2>
                <ResultList results={results} loading={loading} handleFullQuoteClick={handleFullQuoteClick} />

                {loading ? (
                    <div className="contact_box">
                        <Skeleton circle={true} height={50} width={50} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        <div style={{ marginLeft: '20px' }}>
                            <Skeleton height={20} width={200} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                            <Skeleton height={20} width={150} style={{ marginTop: '5px' }} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        </div>
                    </div>
                ) : (
                    <div className="contact_box">
                        <div>
                            <img src={require("../assets/image/person.png")} alt="" />
                        </div>
                        <div>
                            <p>Need Help? Talk to our price consultant</p>
                            <a href="tel:+0123456789">Faisal Shaik <CallSharpIcon /></a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResultsPage;


