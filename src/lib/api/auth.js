import client from './client';

export const login = ({ id, password }) =>
    client.post('/api/auth/login', { id, password });