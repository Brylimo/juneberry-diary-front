import client from './client';

export const getAllTags = async(blogId) => {
    const res = await client.get('/v1/tag/all', {
        params: {
            blogId: blogId
        }
    })
    return res.data;
}