import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from 'react-loading-skeleton';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import 'react-loading-skeleton/dist/skeleton.css';
import "../assets/css/profilePage.css";
import { LocationContext } from '../context/LocationContext';
import { orderData } from './FullQuotePage';
import { FaAngleRight } from 'react-icons/fa';
import config from '../api/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
    const navigate = useNavigate();
    const { fromLocation, toLocation, selectedResult } = useContext(LocationContext);
    const [userData, setUserData] = useState({
        name: orderData.name,
        email: orderData.email,
        phone: orderData.mobile,
    });

    const getUserInitials = (name) => {
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part[0]).join('').toUpperCase();
        return initials.slice(0, 2);
    };

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({ ...userData });
    const [dialogOpen, setDialogOpen] = useState(false);
    const userId = orderData.id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/order`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();

                if (data.order && Array.isArray(data.order)) {
                    const filteredOrders = data.order.filter(order =>
                        order.name?.toLowerCase() === userData.name.toLowerCase() &&
                        order.email?.toLowerCase() === userData.email.toLowerCase()     
                    );

                    setOrders(filteredOrders);
                } else {
                    console.warn('Unexpected API response format:', data);
                    setOrders([]);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userData]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setDrawerOpen(true);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    const handleEditClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditMode(false);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/api/users/?name=${updatedUserData.name}&email=${updatedUserData.email}&phone=${updatedUserData.phone}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            setUserData(updatedUserData);
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            setDialogOpen(false);
            setEditMode(false);
            toast.success('Profile updated successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                draggable: true,
                theme: "dark",
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Error updating profile. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                draggable: true,
                theme: "dark",
            });
        }
    };

    return (
        <div className="profile-page">
            <ToastContainer limit={5} autoClose={3000} draggable />
            <div className="profile-page-header">
                <ArrowBackIcon onClick={handleBackClick} />
                <h2>Profile Page</h2>
            </div>
            {loading ? (
                <div className="user-details">
                    <Skeleton circle={true} height={80} width={80} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                    <div className="user-details-content">
                        <Skeleton height={20} width={150} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        <Skeleton height={20} width={200} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        <Skeleton height={20} width={100} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                    </div>
                </div>
            ) : (
                <div className="user-details">
                    <div className='user-logo'>
                        <div>{getUserInitials(userData.name)}</div>
                    </div>
                    <div className="user-details-content">
                        <EditIcon
                            onClick={handleEditClick}
                            style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                        />
                        <p><strong>Name : </strong>{userData.name === "Not Found" ? (<span style={{ color: "red" }}> Not Found</span>) : userData.name}</p>
                        <p><strong>Email : </strong>{userData.email === "Not Found" ? (<span style={{ color: "red" }}> Not Found</span>) : userData.email}</p>
                        <p><strong>Phone : </strong>{userData.phone === "Not Found" ? (<span style={{ color: "red" }}> Not Found</span>) : userData.phone}</p>
                    </div>
                </div>
            )}

            <Dialog open={dialogOpen} onClose={handleDialogClose} style={{ width: '100%', maxWidth: '600px', margin: 'auto' }} >
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={updatedUserData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={updatedUserData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={updatedUserData.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveClick} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <h2 className='heading'>My Orders</h2>
            {loading ? (
                <div className="orders-list">
                    {Array(3).fill().map((_, index) => (
                        <div className="order-item" key={index}>
                            <Skeleton height={20} width={200} baseColor="#d3d3d3" highlightColor="#ffffffab" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="orders-list">
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div className="order-item" key={order.id || index} onClick={() => handleOrderClick(order)}>
                                <p>{index + 1}.  <strong> {order.ship_name || 'N/A'} </strong> ( {order.port_from + " → " + order.port_to} )</p>
                                <FaAngleRight />
                            </div>
                        ))
                    )}
                </div>
            )}

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <div className="drawer-content">
                    <div className="drawer-header">
                        <h2>Order Details</h2>
                        <CloseIcon onClick={toggleDrawer(false)} />
                    </div>
                    {selectedOrder && (
                        <div className="drawer-inner">
                            <p><strong>Ship Name: </strong> {selectedOrder.ship_name || 'N/A'}</p>
                            <p><strong>Ship Date: </strong> {selectedOrder.ship_date || 'N/A'}</p>
                            <p><strong>Total: </strong> ₹ {selectedOrder.total || 'N/A'}</p>

                            {selectedOrder.vessel ? (
                                <>
                                    <p><strong>Carrier: </strong> {selectedOrder.vessel.carrier || 'N/A'}</p>
                                    <p><strong>Departure: </strong> {selectedOrder.vessel.departure ? new Date(selectedOrder.vessel.departure).toLocaleDateString() : 'N/A'}</p>
                                    <p><strong>Arrival: </strong> {selectedOrder.vessel.arrival ? new Date(selectedOrder.vessel.arrival).toLocaleDateString() : 'N/A'}</p>
                                    <p><strong>BL Fee: </strong> ₹ {selectedOrder.vessel.bl_fee || 'N/A'}</p>
                                    <p><strong>Seal Fee: </strong> ₹ {selectedOrder.vessel.seal_fee || 'N/A'}</p>
                                    <p><strong>MUC: </strong> ₹ {selectedOrder.vessel.muc || 'N/A'}</p>
                                    <p><strong>Toll Charge: </strong> ₹ {selectedOrder.vessel.toll_charge || 'N/A'}</p>
                                    <p><strong>Temperature Variance: </strong> ₹ {selectedOrder.vessel.temperature_variance || 'N/A'}</p>
                                    <p><strong>Platform Fee: </strong> ₹ {selectedOrder.vessel.plateform_fee || 'N/A'}</p>
                                    <p><strong>ISPS: </strong> ₹ {selectedOrder.vessel.isps || 'N/A'}</p>
                                    <p><strong>THC(BMCT): </strong> ₹ {selectedOrder.vessel.thc_bmct || 'N/A'}</p>
                                    <p><strong>Surrender BL: </strong> ₹ {selectedOrder.vessel.surrender_bl || 'N/A'}</p>
                                </>
                            ) : (
                                <p><strong>Vessel Information: </strong> Not Available</p>
                            )}
                        </div>
                    )}
                </div>
            </Drawer>
        </div>
    );
}

export default ProfilePage;

