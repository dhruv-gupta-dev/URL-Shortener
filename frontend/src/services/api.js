import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
});

export const shortenUrl = (longUrl) => api.post('/api/shorten', {longUrl});

export const getAllUrls = () => api.get('/api/urls');

export default api;