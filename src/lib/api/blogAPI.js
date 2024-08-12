import client from "./client";

export const getBlogById = async (id) => {
    const res = await client.get('/blog/getBlogById', {
        params: {
            id: id
        }
    })
    return res.data;
}

export const createBlog = async ({ blogId, blogName }) => {
    const res = await client.post('/blog/createBlog', { blogId, blogName })
    return res.data;
}