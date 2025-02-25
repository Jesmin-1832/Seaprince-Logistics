


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import Drawer from '@mui/material/Drawer';
// import CloseIcon from '@mui/icons-material/Close';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import "../assets/css/fullQuotePage.css";

// function FullQuotePage() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { fromName, toName, selectedResult } = location.state || {};
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [tabValue, setTabValue] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [quoteData, setQuoteData] = useState(null);

//     useEffect(() => {
//         const fetchQuoteData = async () => {
//             try {
//                 const response = await fetch(`https://app.seaprince.click4demos.co.in/api/quote?id=${selectedResult.id}`);
//                 if (!response.ok) throw new Error(`Error: ${response.status}`);
//                 const data = await response.json();
//                 setQuoteData(data);
//             } catch (error) {
//                 console.error('Error fetching quote data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (selectedResult && selectedResult.id) {
//             fetchQuoteData();
//         }
//     }, [selectedResult]);

//     const handleBackClick = () => navigate(-1);
//     const handlePlaceOrder = () => alert("Order placed successfully!");
//     const toggleDrawer = (open) => () => setDrawerOpen(open);
//     const handleTabChange = (newValue) => setTabValue(newValue);

//     return (
//         <div className="full-quote-page">
//             <div className="full-quote-page-header">
//                 <ArrowBackIcon onClick={handleBackClick} />
//                 <h2>{fromName} To {toName}</h2>
//             </div>
//             <div className="full-quote-page-content">
//                 {loading ? (
//                     <Skeleton height={30} width={200} />
//                 ) : (
//                     <div className="full-quote-heading">
//                         <h3>Vessel Details</h3>
//                         <button>Vessel Schedule</button>
//                     </div>
//                 )}
//                 {loading ? (
//                     <Skeleton height={100} width={300} />
//                 ) : (
//                     quoteData && (
//                         <div className="quote-details">
//                             <img src={quoteData.vessel.carrier_image} alt="" />
//                             <div className="quote-details-content">
//                                 <h2>{quoteData.vessel.shipname}</h2>
//                                 <p>Carrier: {quoteData.vessel.carrier}</p>
//                                 <div className="quote-content-inner">
//                                     <p>{new Date(quoteData.vessel.departure).toLocaleDateString()} <span>ETD</span></p>
//                                     <p>{new Date(quoteData.vessel.arrival).toLocaleDateString()} <span>ETA</span></p>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 )}
//                 <div className="full-quote-pricing">
//                     {loading ? (
//                         <Skeleton height={300} />
//                     ) : (
//                         quoteData && (
//                             <>
//                                 <div className="pricing-heading">
//                                     <h2>Quotation</h2>
//                                     <ChevronRightRoundedIcon />
//                                 </div>
//                                 <div className="pricing-content">
//                                     <div><p>Freight Charges</p><span>₹ {quoteData.vessel.freight_charges}</span></div>
//                                     <div><p>Origin Charge</p><span>₹ {quoteData.vessel.bl_fee}</span></div>
//                                     <div className="pricing-total">
//                                         <span>Total</span><span>₹ {quoteData.total_charges}</span>
//                                     </div>
//                                     <button onClick={toggleDrawer(true)}>View Full Quote</button>
//                                 </div>
//                             </>
//                         )
//                     )}
//                 </div>
//             </div>
//             <div className="fixed-bottom">
//                 {loading ? (
//                     <Skeleton height={50} width={150} />
//                 ) : (
//                     quoteData && (
//                         <>
//                             <div className="total-price">
//                                 <p>₹ {quoteData.total}</p>
//                                 <span>For 1 Container</span>
//                             </div>
//                             <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
//                         </>
//                     )
//                 )}
//             </div>
//             <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer(false)}>
//                 <div className="drawer-content">
//                     <div className="drawer-header">
//                         <h2>Full Quotation</h2>
//                         <CloseIcon onClick={toggleDrawer(false)} />
//                     </div>
//                     <div className="drawer-tabs">
//                         <button className={tabValue === 0 ? "active" : ""} onClick={() => handleTabChange(0)}>Without GST</button>
//                         <button className={tabValue === 1 ? "active" : ""} onClick={() => handleTabChange(1)}>With GST</button>
//                     </div>
//                     <div className="drawer-body">
//                         <h3>Freight Charge</h3>
//                         <p>O/F: ₹ {quoteData?.vessel.freight_charges}</p>
//                         <h3>Origin Charge</h3>
//                         <p>BL Fee: ₹ {quoteData?.vessel.bl_fee}</p>
//                         <p>Seal Fee: ₹ {quoteData?.vessel.seal_fee}</p>
//                         <p>MUC: ₹ {quoteData?.vessel.muc}</p>
//                         <p>Toll Charge: ₹ {quoteData?.vessel.toll_charge}</p>
//                         <p>Temperature Variance: ₹ {quoteData?.vessel.temperature_variance}</p>
//                         <p>Platform Fee: ₹ {quoteData?.vessel.plateform_fee}</p>
//                         <p>ISPS: ₹ {quoteData?.vessel.isps}</p>
//                         <p>THC(BMCT): ₹ {quoteData?.vessel.thc_bmct}</p>
//                         <p>Surrender BL: ₹ {quoteData?.vessel.surrender_bl}</p>
//                     </div>
//                     <div className="drawer-footer">
//                         <span>Total: ₹ {tabValue === 0 ? quoteData?.total_charges : quoteData?.total}</span>
//                     </div>
//                 </div>
//             </Drawer>
//         </div>
//     );
// }

// export default FullQuotePage;



import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../assets/css/fullQuotePage.css";
import { LocationContext } from '../context/LocationContext';

function FullQuotePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fromLocation, toLocation, selectedResult } = useContext(LocationContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [quoteData, setQuoteData] = useState(null);

    useEffect(() => {
        const fetchQuoteData = async () => {
            try {
                const response = await fetch(`https://app.seaprince.click4demos.co.in/api/quote?id=${selectedResult.id}`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setQuoteData(data);
            } catch (error) {
                console.error('Error fetching quote data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedResult && selectedResult.id) {
            fetchQuoteData();
        }
    }, [selectedResult]);

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

    const calculateOriginTotal = () => {
        if (!quoteData || !quoteData.vessel) return 0;

        const { bl_fee, seal_fee, muc, toll_charge, temperature_variance, plateform_fee, isps, thc_bmct, surrender_bl } = quoteData.vessel;

        return (bl_fee || 0) + (seal_fee || 0) + (muc || 0) + (toll_charge || 0) +
            (temperature_variance || 0) + (plateform_fee || 0) + (isps || 0) +
            (thc_bmct || 0) + (surrender_bl || 0);
    };

    return (
        <div className="full-quote-page">
            <div className="full-quote-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>{fromLocation.name} To {toLocation.name}</h2>
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
                    quoteData && quoteData.vessel ? (
                        <div className="quote-details">
                            <img src={quoteData.vessel.carrier_image ? quoteData.vessel.carrier_image : require("../assets/image/loader.png")} alt=" " />
                            <div className="quote-details-content">
                                <h2>{quoteData.vessel.shipname}</h2>
                                <p>Carrier: {quoteData.vessel.carrier}</p>
                                <div className="quote-content-inner">
                                    <p>
                                        {new Date(quoteData.vessel.departure).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })} <span>ETD</span>
                                    </p>
                                    <p>
                                        {new Date(quoteData.vessel.arrival).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })} <span>ETA</span>
                                    </p>
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
                        quoteData && quoteData.vessel && (
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
                                        <p>Freight Charges</p>
                                        <span>₹ {quoteData.vessel.freight_charges}</span>
                                    </div>
                                    <div>
                                        <p>Origin Charge</p>
                                        <span>₹ {calculateOriginTotal()}</span>
                                    </div>
                                    <div className="pricing-total">
                                        <div>
                                            <span>Total</span>
                                            <span>₹ {quoteData.vessel.freight_charges + calculateOriginTotal()}</span>
                                        </div>
                                    </div>
                                    <button onClick={toggleDrawer(true)}>View Full Quote</button>
                                </div>
                            </>
                        )
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
                    quoteData && quoteData.vessel && (
                        <>
                            <div className="total-price">
                                <p>₹ {quoteData.total}</p>
                                <span>For 1 Container</span>
                            </div>
                            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                        </>
                    )
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
                        {tabValue === 0 && quoteData && quoteData.vessel && (
                            <>
                                <h3>Freight Charge</h3>
                                <div>
                                    <p>O/F</p>
                                    <span>₹ {quoteData.vessel.freight_charges}</span>
                                </div>
                                <h3>Origin Charge</h3>
                                <div>
                                    <p>BL Fee</p>
                                    <span>₹ {quoteData.vessel.bl_fee}</span>
                                </div>
                                <div>
                                    <p>Seal Fee</p>
                                    <span>₹ {quoteData.vessel.seal_fee}</span>
                                </div>
                                <div>
                                    <p>MUC</p>
                                    <span>₹ {quoteData.vessel.muc}</span>
                                </div>
                                <div>
                                    <p>Toll Charge</p>
                                    <span>₹ {quoteData.vessel.toll_charge}</span>
                                </div>
                                <div>
                                    <p>Temperature Variance</p>
                                    <span>₹ {quoteData.vessel.temperature_variance}</span>
                                </div>
                                <div>
                                    <p>Platform Fee</p>
                                    <span>₹ {quoteData.vessel.plateform_fee}</span>
                                </div>
                                <div>
                                    <p>ISPS</p>
                                    <span>₹ {quoteData.vessel.isps}</span>
                                </div>
                                <div>
                                    <p>THC(BMCT)</p>
                                    <span>₹ {quoteData.vessel.thc_bmct}</span>
                                </div>
                                <div>
                                    <p>Surrender BL</p>
                                    <span>₹ {quoteData.vessel.surrender_bl}</span>
                                </div>
                            </>
                        )}
                        {tabValue === 1 && quoteData && quoteData.vessel && (
                            <>
                                <h3>Freight Charge</h3>
                                <div>
                                    <p>O/F</p>
                                    <span>₹ {quoteData.vessel.freight_charges}</span>
                                </div>
                                <h3>Origin Charge</h3>
                                <div>
                                    <p>BL Fee</p>
                                    <span>₹ {quoteData.vessel.bl_fee}</span>
                                </div>
                                <div>
                                    <p>Seal Fee</p>
                                    <span>₹ {quoteData.vessel.seal_fee}</span>
                                </div>
                                <div>
                                    <p>MUC</p>
                                    <span>₹ {quoteData.vessel.muc}</span>
                                </div>
                                <div>
                                    <p>Toll Charge</p>
                                    <span>₹ {quoteData.vessel.toll_charge}</span>
                                </div>
                                <div>
                                    <p>Temperature Variance</p>
                                    <span>₹ {quoteData.vessel.temperature_variance}</span>
                                </div>
                                <div>
                                    <p>Platform Fee</p>
                                    <span>₹ {quoteData.vessel.plateform_fee}</span>
                                </div>
                                <div>
                                    <p>ISPS</p>
                                    <span>₹ {quoteData.vessel.isps}</span>
                                </div>
                                <div>
                                    <p>THC(BMCT)</p>
                                    <span>₹ {quoteData.vessel.thc_bmct}</span>
                                </div>
                                <div>
                                    <p>Surrender BL</p>
                                    <span>₹ {quoteData.vessel.surrender_bl}</span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="drawer-footer">
                        <div className="total-cost">
                            <span>Total</span>
                            <span>   ₹ {(quoteData?.vessel?.freight_charges && calculateOriginTotal())
                                ? (quoteData.vessel.freight_charges + calculateOriginTotal()) * (tabValue === 1 ? 5000 : 1)
                                : 0}</span>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default FullQuotePage;
