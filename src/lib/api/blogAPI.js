import client from "./client";

export const getBlogById = async (id) => {
    const res = await client.get('/v1/blog', {
        params: {
            id: id
        }
    })
    return res.data;
}

export const getAllBlogs = async () => {
    const res = await client.get('/v1/blog/blogs')
    return res.data;
}

export const getAllCategories = async ({ blogId }) => {
    const res = await client.get(`/v1/blog/${blogId}/category/categories`)
    return res.data;
}

export const createBlog = async ({ blogId, blogName }) => {
    const res = await client.post('/v1/blog', { blogId, blogName })
    return res.data;
}

export const addCategories = async ({ blogId, categoryInfos }) => {
    const res = await client.post(`/v1/blog/${blogId}/category`, {
        categoryInfos
    })
    return res.data;
}

export const getAllTags = async({ blogId }) => {
    const res = await client.get(`/v1/blog/${blogId}/tag/tags`)
    return res.data;
}