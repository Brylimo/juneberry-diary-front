import client from './client';

export const uploadImg = async ({editorImg}) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const res = await client.post('/post/uploadImage', { editorImg }, config);
    return res.data;
}