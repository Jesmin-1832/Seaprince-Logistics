import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';
import '../assets/css/loginPage.css';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const restrictionEnabled = true; // Set this to false to disable restriction
        if (!restrictionEnabled) return;

        try {
            await axios.get(`${config.apiUrl}/csrf-token`, { withCredentials: false });
            await axios.post(`${config.apiUrl}/api/login`, {
                email,
                password
            }, { withCredentials: false });
            navigate('/');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page">
            <div className='login-background'>
                <img src={require("../assets/image/Seaprince-white.png")} alt="LOGO" />
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
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;
