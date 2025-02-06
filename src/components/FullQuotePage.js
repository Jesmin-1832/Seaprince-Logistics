import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../assets/css/fullQuotePage.css";

function FullQuotePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { result, from, to } = location.state || {};
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handlePlaceOrder = () => {
        alert("Order placed successfully!");
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className="full-quote-page">
            <div className="full-quote-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>{from} To {to}</h2>
            </div>
            <div className="full-quote-page-content">
                {loading ? (
                    <div className="full-quote-heading">
                        <Skeleton height={30} width={200} baseColor="#ffffff17" highlightColor="#ffffffab" />
                        <Skeleton height={30} width={150} baseColor="#ffffff17" highlightColor="#ffffffab" />
                    </div>
                ) : (
                    <div className="full-quote-heading">
                        <h3>Vessel Details</h3>
                        <button>Vessel Schedule</button>
                    </div>
                )}
                {loading ? (
                    <div className="quote-details">
                        <Skeleton circle={true} height={50} width={50} baseColor="#ffffff17" highlightColor="#ffffffab" />
                        <div className="quote-details-content">
                            <div style={{ marginLeft: '20px' }}>
                                <Skeleton height={20} width={200} baseColor="#ffffff17" highlightColor="#ffffffab" />
                                <Skeleton height={20} width={50} style={{ marginTop: '5px' }} baseColor="#ffffff17" highlightColor="#ffffffab" />
                                <div className="quote-content-inner">
                                    <Skeleton height={20} width={100} baseColor="#ffffff17" highlightColor="#ffffffab" />
                                    <Skeleton height={20} width={100} baseColor="#ffffff17" highlightColor="#ffffffab" />
                                </div>
                                <div className="quote-content-inner">
                                    <Skeleton height={20} width={50} baseColor="#ffffff17" highlightColor="#ffffffab" />
                                    <Skeleton height={20} width={50} baseColor="#ffffff17" highlightColor="#ffffffab" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    result ? (
                        <div className="quote-details">
                            <img src={result.imgSrc} alt="" />
                            <div className="quote-details-content">
                                <h2>{result.name}</h2>
                                <p>Carrier: {result.stations}</p>
                                <div className="quote-content-inner">
                                    <p>{result.startDate} 2025 <span>ETD</span></p>
                                    <p>{result.endDate} 2025 <span>ETA</span></p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No quote details available.</p>
                    )
                )}
                <div className="full-quote-pricing">
                    {loading ? (
                        <Skeleton height={300} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                    ) : (
                        <>
                            <div className="pricing-heading">
                                <div>
                                    <h2>Quotation</h2>
                                    <p>This quotation includes GST</p>
                                </div>
                                <div>
                                    <ChevronRightRoundedIcon />
                                </div>
                            </div>
                            <div className="pricing-content">
                                <div>
                                    <p>Freight Charges({result.price})</p>
                                    <span>₹ 0,00,000</span>
                                </div>
                                <div>
                                    <p>Origin Charge</p>
                                    <span>₹ 00,000</span>
                                </div>
                                <div className="pricing-total">
                                    <div>
                                        <span>Total</span>
                                        <span>₹ 0,00,000</span>
                                    </div>
                                </div>
                                <button onClick={toggleDrawer(true)}>View Full Quote</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="fixed-bottom">
                {loading ? (
                    <>
                        <div className="total-price">
                            <Skeleton height={25} width={150} baseColor="#ffffff17" highlightColor="#ffffffab" />
                            <Skeleton height={20} width={100} baseColor="#ffffff17" highlightColor="#ffffffab" />
                        </div>
                        <Skeleton height={50} width={150} borderRadius={30} baseColor="#ffffff17" highlightColor="#ffffffab" />
                    </>
                ) : (
                    <>
                        <div className="total-price">
                            <p>₹ 0,00,000</p>
                            <span>For 1 Container</span>
                        </div>
                        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                    </>
                )}
            </div>
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <div className="drawer-content">
                    <div className="drawer-header">
                        <h2>Full Quotation</h2>
                        <CloseIcon onClick={toggleDrawer(false)} />
                    </div>
                    <div className="drawer-tabs">
                        <div className="tab-buttons">
                            <button
                                className={`tab-btn ${tabValue === 0 ? "active" : ""}`}
                                onClick={() => handleTabChange(0)}
                            >
                                Without GST
                            </button>
                            <button
                                className={`tab-btn ${tabValue === 1 ? "active" : ""}`}
                                onClick={() => handleTabChange(1)}
                            >
                                With GST
                            </button>
                            <div className="tab-indicator" style={{ transform: `translateX(${tabValue * 100}%)` }} />
                        </div>
                    </div>
                    <div className="drawer-body">
                        {tabValue === 0 && (
                            <>
                                <h3>Freight Charge</h3>
                                <div>
                                    <p>O/F</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <h3>Origin Charge</h3>
                                <div>
                                    <p>BL Fee</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Seal Fee</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>MUC</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Toll Charge</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Temperature Variance</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Platform Fee</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>ISPS</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>THC(BMCT)</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Surrender BL</p>
                                    <span>₹ 0,000</span>
                                </div>
                            </>
                        )}
                        {tabValue === 1 && (
                            <>
                                <h3>Freight Charge</h3>
                                <div>
                                    <p>O/F</p>
                                    <span>₹ 0,00,000</span>
                                </div>
                                <h3>Origin Charge</h3>
                                <div>
                                    <p>BL Fee</p>
                                    <span>₹ 00,000</span>
                                </div>
                                <div>
                                    <p>Seal Fee</p>
                                    <span>₹ 00,000</span>
                                </div>
                                <div>
                                    <p>MUC</p>
                                    <span>₹ 00,000</span>
                                </div>
                                <div>
                                    <p>Toll Charge</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Temperature Variance</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>Platform Fee</p>
                                    <span>₹ 00,000</span>
                                </div>
                                <div>
                                    <p>ISPS</p>
                                    <span>₹ 0,000</span>
                                </div>
                                <div>
                                    <p>THC(BMCT)</p>
                                    <span>₹ 00,000</span>
                                </div>
                                <div>
                                    <p>Surrender BL</p>
                                    <span>₹ 0,000</span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="drawer-footer">
                        <div className="total-cost">
                            <span>Total</span>
                            <span>{tabValue === 0 ? "₹ 0,00,000" : "₹ 00,00,000"}</span>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default FullQuotePage;
