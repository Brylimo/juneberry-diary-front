import axios from 'axios';

const client = axios.create({
    baseURL: "http://221.143.21.117:80/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default client;