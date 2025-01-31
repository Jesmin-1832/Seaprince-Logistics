import './App.css';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import SchedulePage from './components/SchedulePage';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'; 
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import React, { useState } from 'react';
import Header from './Header';

function App() {
  const [navValue, setNavValue] = useState(0);

  const handleNavigationChange = (event, newValue) => {
    setNavValue(newValue);
  };

  return (
    <div className="App">
      <div className='main'>
        <Header />
        {navValue === 0 && <HomePage />}
        {navValue === 1 && <ServicesPage />}
        {navValue === 2 && <SchedulePage />}
        <BottomNav navValue={navValue} handleNavigationChange={handleNavigationChange} />
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
