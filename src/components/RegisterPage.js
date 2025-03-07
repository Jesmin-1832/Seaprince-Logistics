import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';
import '../assets/css/registerPage.css';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = ({ setAuthenticated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.get(`${config.apiUrl}/sanctum/csrf-cookie`, { withCredentials: false });
            const response = await axios.post(`${config.apiUrl}/api/signup`, {
                name,
                email,
                password,
                phone
            }, { withCredentials: false });

            if (response.status === 201) {
                const { access_token } = response.data;
                localStorage.setItem('access_token', access_token);
                const userData = { name, email, phone }; 
                localStorage.setItem('userData', JSON.stringify(userData));
                setTimeout(() => {
                    setAuthenticated(true);
                }, 2000);
                toast.success('Registration successful!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: true,
                    theme: "dark",
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Ensure setTimeout is placed after toast.success
            } else {
                throw new Error('Registration failed');
            }
        } catch (err) {
            let errorMessage = 'Registration failed. Please try again.';
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
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
        <div className="register-page">
            <ToastContainer limit={5} autoClose={3000} draggable />
            <div className='register-background'>
                <img src={require("../assets/image/Seaprince-logo.png")} alt="LOGO" />
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
                    <label>Enter Your Phone :</label>
                    <div className='form-input'>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <LocalPhoneOutlinedIcon />
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
                <button type="submit" className="submit-button">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default RegisterPage;



