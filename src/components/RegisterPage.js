import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';
import '../assets/css/registerPage.css';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const restrictionEnabled = true; // Set this to false to disable restriction
        if (!restrictionEnabled) return;

        try {
            await axios.get(`${config.apiUrl}/csrf-token`, { withCredentials: false });
            await axios.post(`${config.apiUrl}/api/signup`, {
                name,
                email,
                password
            }, { withCredentials: false });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="register-page">
            <div className='register-background'>
                <img src={require("../assets/image/Seaprince-white.png")} alt="LOGO" />
            </div>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label>Enter Your Name :</label>
                    <div className='form-input'>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <FaRegUser />
                    </div>
                </div>
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
                <button type="submit" className="submit-button">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default RegisterPage;
