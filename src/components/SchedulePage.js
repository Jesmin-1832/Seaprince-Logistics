import React, { useState, useEffect } from "react";
import "../assets/css/schedule.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import config from '../api/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SchedulePage() {
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/schedule`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                setScheduleData(data.vessels);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
                toast.error('Error fetching schedule data.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "dark",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchScheduleData();
    }, []);

    return (
        <div>
            <ToastContainer limit={5} autoClose={3000} draggable />
            <div className="schedule_section">
                {loading ? (
                    Array(4).fill().map((_, index) => (
                        <div className="result_box" key={index}>
                            <Skeleton height={200} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                            <br />
                        </div>
                    ))
                ) : (
                    scheduleData.length > 0 ? (
                        <div className="schedule-list">
                            <h2>Schedule Result</h2>
                            {scheduleData.map((schedule, index) => (
                                <div className="result_box" key={index}>
                                    <div className="result_box_inner">
                                        <div className="result_box_inner_up">
                                            <div>
                                                <img src={`https://app.seaprince.click4demos.co.in/storage/` + schedule.carrier_image || require("../assets/image/loader.png")} alt=" " />
                                            </div>
                                            <div className="result_box_inner_content">
                                                <h2>{schedule.shipname}</h2>
                                                <p>
                                                    {new Date(schedule.departure).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric"
                                                    })}
                                                    <span></span>
                                                    {new Date(schedule.arrival).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric"
                                                    })}
                                                </p>
                                            </div>
                                            <div className="result_box_timing">
                                                <p>
                                                    {schedule.days
                                                        ? `${schedule.days} Days`
                                                        : `${Math.max(0, (new Date(schedule.arrival) - new Date(schedule.departure)) / (1000 * 60 * 60 * 24))} Days`}
                                                </p>
                                                <p>{schedule.from} To {schedule.to || "Direct"}</p>
                                            </div>
                                        </div>
                                        <div className="result_box_inner_down">
                                            <p>{schedule.availibility || "N/A"}</p>
                                            <div className="result_box_carrier">
                                                <p><strong>Carrier :</strong> {schedule.carrier || "N/A"}</p>
                                                <p><strong>Terminal:</strong> {schedule.terminal || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Schedule Data Not Available.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default SchedulePage;
