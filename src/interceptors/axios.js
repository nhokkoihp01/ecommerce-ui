import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_PUBLIC_URL
const PUBLIC_URL = "https://ecommerce-cdw.onrender.com/api"
const instance = axios.create({
    baseURL: PUBLIC_URL,
    headers: { 'Content-Type': 'application/json' },
});
instance.interceptors.request.use(async (config) => {

    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        const { headers } = config;
        return {
            ...config,
            headers: {
                ...headers,
                'Access-Token': `Token ${accessToken}`,
            },
        };
    }
    return config;
});
export default instance;