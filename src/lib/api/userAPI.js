import client from './client';

export const register = async ({name, email, username, password}) => {
    const res = await client.post('/v1/user', { name, email, username, password });
    return res.data;
}

export const getUserByEmail = async ({ email }) => {
    const res = await client.get('/v1/user/email', {
        params: {
            email: email
        }
    })
    return res.data;
}