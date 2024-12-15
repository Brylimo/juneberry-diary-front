import client from './client';

export const uploadImg = async ({editorImg, blogId, postId}) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const res = await client.post('/v1/post/uploadPostImage', { editorImg, blogId, postId }, config);
    return res.data;
}

export const getPost = async (blogId, id) => {
    const res = await client.get('/v1/post/getPost', {
        params: {
            blogId: blogId,
            id: id
        }
    })
    return res.data;
}

export const getPostByIndex = async (blogId, index) => {
    const res = await client.get('/v1/post/getPostByIndex', {
        params: {
            blogId: blogId,
            index: index
        }
    })
    return res.data;
}

export const getTempPostCnt = async (blogId) => {
    const res = await client.get('/v1/post/getTempPostCnt', {
        params: {
            blogId: blogId
        }
    })
    return res.data;
}

export const getPostList = async ({blogId, tagName, isTemp, isPublic, page, size}) => {
    const res = await client.get('/v1/post/getPostList', {
        params: {
            blogId: blogId,
            tagName: tagName,
            isTemp: isTemp,
            isPublic: isPublic,
            page: page,
            size: size
        }
    })
    return res.data;
}

export const updatePost = async ({ postId, category, subCategory, title, description, content, blogId, isTemp, isPublic, tags, thumbnailImg, thumbnailPath }) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    
    const res = await client.post('/v1/post/updatePost', {
        postId, category, subCategory, title, description, content, blogId, isTemp, isPublic, tags, thumbnailImg, thumbnailPath
    }, config)
    return res.data;
}

export const deletePost = async (id) => {
    const res = await client.delete(`/v1/post/${id}`);
    return res.data;
}

export const addPost = async ({ date, category, subCategory, title, description, content, isTemp, isPublic, blogId, tags, thumbnailImg, thumbnailPath }) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const res = await client.post('/v1/post/addPost', { date: `${year}-${month}-${day}`, category, subCategory, title, description, content, isTemp, isPublic, blogId, tags, thumbnailImg, thumbnailPath }, config)
    return res.data;
}