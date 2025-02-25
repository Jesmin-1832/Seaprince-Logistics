import axiosInstance from './axiosConfig';

export const getCsrfToken = () => {
    return axiosInstance.get('/sanctum/csrf-cookie');
};

export const login = async (email, password) => {
    await getCsrfToken();
    return axiosInstance.post('/login', { email, password });
};

export const register = async (name, email, password) => {
    await getCsrfToken();
    return axiosInstance.post('/register', { name, email, password });
};
