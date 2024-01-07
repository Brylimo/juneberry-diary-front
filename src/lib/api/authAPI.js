import client from './client';

export const register = async ({name, email, username, password}) => {
    const res = await client.post('/auth/register', { name, email, username, password });
    return res.data;
}

export const login = async ({ username, password }) => {
    const res = await client.post('/auth/login', { username, password });
    return res.data;
}

export const logout = () => client.get('/auth/logout');

export const validate = () => client.get('/auth/validate');