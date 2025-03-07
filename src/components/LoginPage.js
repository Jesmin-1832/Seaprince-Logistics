import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';
import '../assets/css/loginPage.css';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({ setAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.get(`${config.apiUrl}/sanctum/csrf-cookie`, { withCredentials: false });
            const response = await axios.post(`${config.apiUrl}/api/login`, {
                email,
                password
            }, { withCredentials: false });

            if (response.status === 200) {
                const { access_token } = response.data;
                localStorage.setItem('access_token', access_token);
                const userResponse = await axios.get(`${config.apiUrl}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const userData = userResponse.data;
                localStorage.setItem('userData', JSON.stringify(userData));
                setTimeout(() => {
                    setAuthenticated(true);
                }, 2000); 
                toast.success('Login Successfully !', {
                    position: "top-center", 
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: true,
                    theme: "dark",
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000); 
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            let errorMessage = 'Login failed. Please try again.';
            if (err.response && err.response.status === 401) {
                errorMessage = 'Invalid email or password';
            } else if (err.response && err.response.status === 422) {
                errorMessage = 'Unprocessable Content. Please check your input.';
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (   
        <div className="login-page">
            <ToastContainer limit={5} autoClose={3000} draggable />
            <div className='login-background'>
                <img src={require("../assets/image/Seaprince-logo.png")} alt="LOGO" />
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>Enter Your Email :</label>
                    <div className='form-input'>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <MdOutlineEmail />
                    </div>
                </div>
                <div className="form-group">
                    <label>Enter Your Password :</label>
                    <div className='form-input'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <RiLockPasswordLine />
                        <div className='form-icon-inner' onClick={togglePasswordVisibility}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-button">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;


