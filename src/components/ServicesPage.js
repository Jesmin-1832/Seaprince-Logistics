import React, { useState, useEffect } from "react";
import "../assets/css/services.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import config from '../api/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ServicesPage() {
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/about`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                console.log("Fetched Data:", data); // ✅ Debugging: Check API response

                // Ensure we extract the right fields
                if (data.data && data.data.title && data.data.body) {
                    setServiceData(data.data);
                } else {
                    console.warn("Unexpected API response format.");
                    setServiceData(null);
                }
            } catch (error) {
                console.error("Error fetching service data:", error);
                toast.error("Error fetching service data.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "dark",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchServicesData();
    }, []);

    return (
        <div>
            <ToastContainer limit={5} autoClose={3000} draggable />
            <div className="services_section">
                {loading ? (
                    <Skeleton height={200} width="80%" baseColor="#d3d3d3" highlightColor="#ffffffab" />
                ) : serviceData ? (
                    <div className="service-content">
                        <h2>{serviceData.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: serviceData.body }} />
                    </div>
                ) : (
                    <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
                        Service Data Not Available.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ServicesPage;

