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
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext'; 
import NotFoundPage from './components/NotFoundPage';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import config from './api/config';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <Router>
        <LocationProvider>
          <AppContent />
        </LocationProvider>
      </Router>
  );
}

function AppContent() { 
  const [navValue, setNavValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAuthenticated(!!token);
    setLoading(false);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setNavValue(0);
        break;
      case "/services":
        setNavValue(1);
        break;
      case "/schedule":
        setNavValue(2);
        break;
      case "/results":
        setNavValue(3);
        break;
      default:
        break;
    }
  }, [location.pathname]);

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
      case 3:
        navigate("/results", { replace: true });
        break;
      default:
        break;
    }
  };

  const showHeader = ["/", "/services", "/schedule"].includes(location.pathname);
  const showBottomNavigation = ["/", "/services", "/schedule", "/results"].includes(location.pathname);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className='main'>
        {showHeader && <Header setAuthenticated={setAuthenticated} />}
        <Routes>
          <Route path="/login" element={authenticated ? <Navigate to="/" /> : <LoginPage setAuthenticated={setAuthenticated} />} />
          <Route path="/signup" element={authenticated ? <Navigate to="/" /> : <RegisterPage setAuthenticated={setAuthenticated} />} />
          <Route path="/" element={
            <ProtectedRoute authenticated={authenticated}>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/services" element={
            <ProtectedRoute authenticated={authenticated}>
              <ServicesPage />
            </ProtectedRoute>
          } />
          <Route path="/schedule" element={
            <ProtectedRoute authenticated={authenticated}>
              <SchedulePage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute authenticated={authenticated}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/from" element={
            <ProtectedRoute authenticated={authenticated}>
              <FromPage />
            </ProtectedRoute>
          } />
          <Route path="/to" element={
            <ProtectedRoute authenticated={authenticated}>
              <ToPage />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute authenticated={authenticated}>
              <ResultsPage />
            </ProtectedRoute>
          } />
          <Route path="/full-quote" element={
            <ProtectedRoute authenticated={authenticated}>
              <FullQuotePage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        {showBottomNavigation && (
          <Paper elevation={3}>
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
          </Paper>
        )}
      </div>
    </div>
  );
}

export default App;


