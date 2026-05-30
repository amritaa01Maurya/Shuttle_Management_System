import axios from 'axios';

// api
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// attach jwt to every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;