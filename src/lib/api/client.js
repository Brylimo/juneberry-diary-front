import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default client;