import { useEffect } from "react";
import axios from 'axios';
import config from './api/config';
import "./assets/css/Header.css";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { IconButton } from "@mui/material";

function Header({ setAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios.get(`${config.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
                const token = localStorage.getItem('access_token');
                if (token) {
                    const response = await axios.get(`${config.apiUrl}/api/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const userData = response.data;
                    localStorage.setItem('userData', JSON.stringify(userData));
                }
            } catch (err) {
                let errorMessage = 'Login failed. Please try again.';
                if (err.response && err.response.status === 401) {
                    errorMessage = 'Invalid email or password';
                }
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post(`${config.apiUrl}/api/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('userData');
            setAuthenticated(false);
            toast.success('Sign out Successfully.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                draggable: true,
                theme: "dark",
            });
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('userData');
                setAuthenticated(false);
                navigate('/login');
                toast.success('Sign out Successfully.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: true,
                    theme: "dark",
                });
            } else {
                toast.error('Sign out failed. Please try again.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        }
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a href=" ">
                            <img src={require("./assets/image/Seaprince-white.png")} alt="Logo" />
                            {/* LOGO */}
                        </a>
                    </li>
                    <li>
                        <a href="/profile">
                            <img src={require("./assets/image/user-logo.png")} alt="Profile" />
                        </a>
                    </li>
                    <div>
                        <IconButton aria-label="delete" onClick={handleLogout}>
                            <LogoutOutlinedIcon/>
                        </IconButton>
                    </div>
                </ul>
            </nav>
        </header>
    );
}
export default Header;



