import './App.css';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import SchedulePage from './components/SchedulePage';
import FromPage from './components/FromPage';
import ToPage from './components/ToPage';
import ResultsPage from './components/ResultsPage';
import FullQuotePage from './components/FullQuotePage';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';

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
      default:
        break;
    }
  };

  const hideHeaderPaths = ["/from", "/to", "/results", "/full-quote"];
  const hideBottomNavPaths = ["/full-quote"];

  return (
    <div className="App">
      <div className='main'>
        {!hideHeaderPaths.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/from" element={<FromPage />} />
          <Route path="/to" element={<ToPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/full-quote" element={<FullQuotePage />} />
        </Routes>
        {!hideBottomNavPaths.includes(location.pathname) && (
          <BottomNav navValue={navValue} handleNavigationChange={handleNavigationChange} />
        )}
      </div>
    </div>
  );
}

function BottomNav({ navValue, handleNavigationChange }) {
  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: "575px", margin: "0 auto" }} elevation={3}>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={handleNavigationChange}
      >
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="Services" icon={<DashboardCustomizeRoundedIcon />} />
        <BottomNavigationAction label="Schedule" icon={<EditCalendarRoundedIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default App;
