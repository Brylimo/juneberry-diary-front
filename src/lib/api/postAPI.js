import client from './client';

export const uploadImg = async ({editorImg, postId}) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    const res = await client.post(`/v1/post/${postId}/image`, { editorImg }, config);
    return res.data;
}

export const getPost = async ({ id }) => {
    const res = await client.get('/v1/post', {
        params: {
            id: id
        }
    })
    return res.data;
}

export const getPostByIndex = async (blogId, index) => {
    const res = await client.get('/v1/posts', {
        params: {
            blogId: blogId,
            index: index
        }
    })
    return res.data;
}

export const getTempPostCnt = async (blogId) => {
    const res = await client.get('/v1/post/temp/count', {
        params: {
            blogId: blogId
        }
    })
    return res.data;
}

export const getPostList = async ({blogId, category, subCategory, tagName, isTemp, isPublic, page, size}) => {
    const res = await client.get('/v1/post/posts', {
        params: {
            blogId: blogId,
            category: category,
            subCategory: subCategory,
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
    
    const res = await client.put('/v1/post', {
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

    const res = await client.post('/v1/post', { date: `${year}-${month}-${day}`, category, subCategory, title, description, content, isTemp, isPublic, blogId, tags, thumbnailImg, thumbnailPath }, config)
    return res.data;
}