import client from './client';

export const uploadImg = async ({editorImg, postId}) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const res = await client.post('/post/uploadPostImage', { editorImg, postId }, config);
    return res.data;
}

export const getTempPost = async (id) => {
    const res = await client.get('/post/getTempPost', {
        params: {
            id: id
        }
    })
    return res.data;
}

export const getTempPostCnt = async () => {
    const res = await client.get('/post/getTempPostCnt', {})
    return res.data;
}

export const getTempPostList = async (page, size) => {
    const res = await client.get('/post/getTempPostList', {
        params: {
            page: page,
            size: size
        }
    })
    return res.data;
}

export const updatePost = async ({ postId, title, description, content, isTemp, isPublic }) => {
    const res = await client.post('/post/updatePost', {
        postId, title, description, content, isTemp, isPublic
    })
    return res.data;
}

export const addPost = async ({ date, title, content, isTemp }) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const res = await client.post('/post/addPost', { date: `${year}-${month}-${day}`, title, content, isTemp })
    return res.data;
}