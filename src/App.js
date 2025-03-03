import './App.css';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import SchedulePage from './components/SchedulePage';
import FromPage from './components/FromPage';
import ToPage from './components/ToPage';
import ResultsPage from './components/ResultsPage';
import FullQuotePage from './components/FullQuotePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import React, { useState } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import NotFoundPage from './components/NotFoundPage';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { AuthProvider } from '@webbydevs/react-laravel-sanctum-auth';
import config from './api/config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './components/ProfilePage';

function App() { 
  return (
    // <AuthProvider
    //   config={{
    //     apiUrl: config.apiUrl,
    //     csrfCookieRoute: 'csrf-token',
    //     signInRoute: 'api/login',
    //     signUpRoute: 'api/lsignup',
    //     withCredentials: true,
    //   }}>
      <Router>
        <LocationProvider>
          <AppContent />
          <ToastContainer />
        </LocationProvider>
      </Router>
    // </AuthProvider>
  );
}

function AppContent() {
  const [navValue, setNavValue] = useState(0);
  const navigate = useNavigate();


  const handleNavigationChange = (event, newValue) => {
    setNavValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/", { replace: true });
        break;
      case 1:
        navigate("/services", { replace: true });
        break;
      case 2:
        navigate("/schedule", { replace: true });
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className='main'>
        {/* <Header />  */}
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/from" element={<FromPage />} />
          <Route path="/to" element={<ToPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/full-quote" element={<FullQuotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>


        {/* <Paper elevation={3}>
          <BottomNavigation
            className='bottomNavigation'
            showLabels
            value={navValue}
            onChange={handleNavigationChange}
          >
            <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
            <BottomNavigationAction label="Services" icon={<DashboardCustomizeRoundedIcon />} />
            <BottomNavigationAction label="Schedule" icon={<EditCalendarRoundedIcon />} />
          </BottomNavigation>
        </Paper> */}
      </div>
    </div>
  );
}

export default App;
