import client from './client';

export const register = ({ username, password }) =>
    client.post('http://localhost:8081/api/auth/register.json', { username, password });

export const login = ({ username, password }) =>
    client.post('http://localhost:8081/api/auth/signin.json', { username, password });