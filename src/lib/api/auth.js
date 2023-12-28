import client from './client';

export const register = ({ name, email, username, password }) =>
    client.post('/auth/register', { name, email, username, password });

export const login = ({ username, password }) =>
    client.post('/auth/login', { username, password });

export const check = () => client.get('/auth/check');