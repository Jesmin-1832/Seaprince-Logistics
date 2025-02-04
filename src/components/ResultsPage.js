import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import "../assets/css/resultsPage.css";

function ResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { from, to } = location.state || {};

    const handleBackClick = () => {
        navigate("/", { state: { from, to }, replace: true });
        window.location.reload();
    };

    const handleFullQuoteClick = (result) => {
        navigate("/full-quote", { state: { result } });
    };

    const slides = [
        { title: "ATLANTIC IBIS", date: "05 Feb", day: "Wed" },
        { title: "C START VOYAG", date: "06 Feb", day: "Thu" },
        { title: "OCEAN BREEZE", date: "07 Feb", day: "Fri" },
    ];

    const results = [
        {
            name:"Ship Name",
            imgSrc: require("../assets/image/why-choose-icon1.png"),
            startDate: "07 Feb",
            endDate: "11 Feb",
            days:"1 Day",
            stations: " Direct",
            price: "$ 1,100",
            containersAvailable: "2 Container Available",
        },
        {
            name:"Ship Name",
            imgSrc: require("../assets/image/why-choose-icon2.png"),
            startDate: "08 Feb",
            endDate: "12 Feb",
            days:"2 Days",
            stations: " Direct",
            price: "$ 1,200",
            containersAvailable: "3 Container Available",
        },
        {
            name:"Ship Name",
            imgSrc: require("../assets/image/why-choose-icon3.png"),
            startDate: "09 Feb",
            endDate: "13 Feb",
            days:"4 Days",
            stations: " Via AUH",
            price: "$ 1,300",
            containersAvailable: "1 Container Available",
        },
        {
            name:"Ship Name",
            imgSrc: require("../assets/image/why-choose-icon4.png"),
            startDate: "10 Feb",
            endDate: "14 Feb",
            days:"5 Days",
            stations: " Direct",
            price: "$ 1,400",
            containersAvailable: "4 Container Available",
        }
    ];

    return (
        <div className="results-page">
            <div className="results-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>{from} To {to}</h2>
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
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="slide-content">
                                <h3>{slide.title}</h3>
                                <p><span>{slide.date}</span> | <span>{slide.day}</span></p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2>Search Result</h2>
                {results.map((result, index) => (
                    <div className="result_box" key={index}>
                        <div className="result_box_inner">
                            <div className="result_box_inner_up">
                                <div>
                                    <img src={result.imgSrc} alt="" />
                                </div>
                                <div className="result_box_inner_content">
                                    <h2>{result.name}</h2>
                                    <p>{result.startDate} <span></span> {result.endDate}</p>
                                </div>
                                <div className="result_box_timing">
                                    <p>{result.days}</p>
                                    <p>{result.stations}</p>
                                </div>
                                <div>
                                    <h3>{result.price}</h3>
                                </div>
                            </div>
                            <div className="result_box_inner_down">
                                <p>{result.containersAvailable}</p>
                                <button onClick={() => handleFullQuoteClick(result)}>Check Full Quote</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="contact_box">
                    <div>
                        <img src={require("../assets/image/person.png")} alt="" />
                    </div>
                    <div>
                        <p>Need Help? Talk to our price consultant</p>
                        <a href="tel:+0123456789">Faisal Shaik <CallSharpIcon /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultsPage;
