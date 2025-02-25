import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://app.seaprince.click4demos.co.in/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
