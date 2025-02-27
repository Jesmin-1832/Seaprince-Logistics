import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/notFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h2>404</h2>
            <span>Page Not Found</span>
            <p>Sorry, the page you are looking for does not exist. 
            <Link to="/"> Go to Home</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
