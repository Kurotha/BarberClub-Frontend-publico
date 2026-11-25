import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const csrfCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('csrftoken='));
    if (csrfCookie) {
        config.headers['X-CSRFToken'] = decodeURIComponent(csrfCookie.split('=')[1]);
    }
    return config;
});

export default api;