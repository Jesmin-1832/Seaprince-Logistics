import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ResultList = ({ results, loading, handleFullQuoteClick }) => {
    return (
        <>
            {loading ? (
                Array(4).fill().map((_, index) => (
                    <div className="result_box" key={index}>
                        <Skeleton height={200} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        <br />
                    </div>
                ))
            ) : (
                results.length === 0 ? (
                    <div className="no-results">
                        <h3>No results found for the selected route.</h3>
                    </div>
                ) : (
                    results.map((result, index) => (
                        <div className="result_box" key={index}>
                            <div className="result_box_inner">
                                <div className="result_box_inner_up">
                                    <div>
                                        <img src={`https://app.seaprince.click4demos.co.in/storage/` + result.carrier_image || require("../assets/image/loader.png")} alt=" " />
                                    </div>
                                    <div className="result_box_inner_content">
                                        <h2>{result.shipname}</h2>
                                        <p>
                                            {new Date(result.departure).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })}
                                            <span></span>
                                            {new Date(result.arrival).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })}
                                        </p>
                                    </div>
                                    <div className="result_box_timing">
                                        <p>
                                            {result.days
                                                ? `${result.days} Days`
                                                : `${Math.max(0, (new Date(result.arrival) - new Date(result.departure)) / (1000 * 60 * 60 * 24))} Days`}
                                        </p>
                                        <p>{result.from} To {result.to || "Direct"}</p>
                                    </div>
                                    <div>
                                        <h3><b>₹ </b>{result.total_charges || "N/A"}</h3>
                                    </div>
                                </div>
                                <div className="result_box_inner_down">
                                    <p>{result.availibility || "N/A"}</p>
                                    <button onClick={() => handleFullQuoteClick(result)}>Check Full Quote</button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            )}
        </>
    );
};

export default ResultList;

