import client from './client';

export const sendCode = async ({ email }) => {
    const res = await client.post('/email/verification-code', { email })
    return res.data;
}