import axios from 'axios';

const client = axios.create({
    baseURL: "http://54.162.224.247:80/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default client;