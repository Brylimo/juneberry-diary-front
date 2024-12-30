import client from './client';

export const sendCode = async ({ email }) => {
    const res = await client.post('/email/temp-code', { email })
    return res.data;
}