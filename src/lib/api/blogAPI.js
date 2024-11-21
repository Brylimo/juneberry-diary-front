import client from "./client";

export const getBlogById = async (id) => {
    const res = await client.get('/v1/blog/getBlogById', {
        params: {
            id: id
        }
    })
    return res.data;
}

export const getAllBlogsByUser = async () => {
    const res = await client.get('/v1/blog/getAllBlogsByUser')
    return res.data;
}

export const createBlog = async ({ blogId, blogName }) => {
    const res = await client.post('/v1/blog/createBlog', { blogId, blogName })
    return res.data;
}