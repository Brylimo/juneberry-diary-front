import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initialize, storePost } from '../../modules/publish';
import { useGetPostByIndexQuery } from '../../hooks/queries/post/useGetPostByIndexQuery';
import Post from '../../components/post/Post';

const PostForm = () => {
    const { id: blogId, pid: index } = useParams();
    const dispatch = useDispatch();
    const { isLoading, isFetching, data: post } = useGetPostByIndexQuery(blogId, index)

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    useEffect(() => {
        if (post && !Array.isArray(post)) { 
            dispatch(storePost({
                id: post.id,
                title: post.title,
                description: post.description,
                mrkdown: post.content,
                updateDt: null,
                isTemp: post.isTemp,
                isPublic: post.isPublic,
                thumbnailPath: post.thumbnailPath
            }))
        }
    }, [post, dispatch])

    if (isLoading || isFetching) {
        return null
    }

    return <Post post={post} />
}

export default PostForm;