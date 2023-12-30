import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:8081/api",
    headers: {
        "Content-Type": "application/json",
    }
});

client.interceptors.request.use(config => {
    /*const { token } = useSelector(({ auth }) => ({
        token: auth.token
    }));

    if (token && token !== null) {
         config.headers.Authorization = `${token}`;
    }*/
    return config;
}, error => {
    return Promise.reject(error);
})

client.interceptors.response.use(response => {
    return response;
}, error => {
    if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
            //window.location.href = "/login";
        }
    } else {
        //window.location.href = "/login";
    }

    return Promise.reject(error);
});

export default client;