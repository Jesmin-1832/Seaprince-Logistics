import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../assets/css/home.css";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'; 
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';

function Home() {
    const [navValue, setNavValue] = React.useState(0); // State for bottom navigation
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigationChange = (event, newValue) => {
        setNavValue(newValue);
        switch (newValue) {
            case 0:
                navigate("/home");
                break;
            case 1:
                navigate("/services");
                break;
            case 2:
                navigate("/schedule");
                break;
            default:
                break;
        }
    };

    return (
        <div className="home_content">
            <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: "575px", margin: "0 auto" }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={navValue}
                    onChange={handleNavigationChange} // Use handleNavigationChange
                >
                    <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
                    <BottomNavigationAction label="Services" icon={<DashboardCustomizeRoundedIcon />} />
                    <BottomNavigationAction label="Schedule" icon={<EditCalendarRoundedIcon />} />
                </BottomNavigation>
            </Paper>
        </div>
    );
}

export default Home;