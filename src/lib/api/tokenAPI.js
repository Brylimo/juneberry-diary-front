import client from './client';

export const register = async ({name, email, username, password}) => {
    const res = await client.post('/v1/user', { name, email, username, password });
    return res.data;
}

export const login = async ({ username, password }) => {
    const res = await client.post('/token/login', { username, password });
    return res.data;
}

export const logout = () => client.get('/token/logout');

export const validate = () => client.get('/token/validate');