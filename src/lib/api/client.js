import axios from 'axios';

const client = axios.create({
    baseURL: "http://54.224.127.97:80/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default client;