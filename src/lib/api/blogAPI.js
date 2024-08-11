import client from "./client";

export const getBlogById = async (id) => {
    const res = await client.get('/blog/getBlogById', {
        params: {
            id: id
        }
    })
    return res.data;
}