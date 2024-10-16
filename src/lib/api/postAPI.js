import client from './client';

export const uploadImg = async ({editorImg, blogId, postId}) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const res = await client.post('/post/uploadPostImage', { editorImg, blogId, postId }, config);
    return res.data;
}

export const getPost = async (blogId, id) => {
    const res = await client.get('/post/getPost', {
        params: {
            blogId: blogId,
            id: id
        }
    })
    return res.data;
}

export const getPostByIndex = async (blogId, index) => {
    const res = await client.get('/post/getPostByIndex', {
        params: {
            blogId: blogId,
            index: index
        }
    })
    return res.data;
}

export const getTempPostCnt = async (blogId) => {
    const res = await client.get('/post/getTempPostCnt', {
        params: {
            blogId: blogId
        }
    })
    return res.data;
}

export const getPostList = async ({blogId, isTemp, isPublic, page, size}) => {
    const res = await client.get('/post/getPostList', {
        params: {
            blogId: blogId,
            isTemp: isTemp,
            isPublic: isPublic,
            page: page,
            size: size
        }
    })
    return res.data;
}

export const updatePost = async ({ postId, title, description, content, blogId, isTemp, isPublic, thumbnailImg, thumbnailPath }) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    
    const res = await client.post('/post/updatePost', {
        postId, title, description, content, blogId, isTemp, isPublic, thumbnailImg, thumbnailPath
    }, config)
    return res.data;
}

export const addPost = async ({ date, title, description, content, isTemp, isPublic, blogId, thumbnailImg, thumbnailPath }) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const res = await client.post('/post/addPost', { date: `${year}-${month}-${day}`, title, description, content, isTemp, isPublic, blogId, thumbnailImg, thumbnailPath }, config)
    return res.data;
}