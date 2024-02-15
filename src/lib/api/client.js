import axios from 'axios';

const client = axios.create({
    baseURL: "https://juneberrydiary.store/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default client;