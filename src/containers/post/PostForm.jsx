import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initialize, storePost } from '../../modules/publish';
import { useGetPostByIndexQuery } from '../../hooks/queries/post/useGetPostByIndexQuery';
import { useDeletePostMutation } from '../../hooks/mutations/post/useDeletePostMutation';
import Post from '../../components/post/Post';

const PostForm = () => {
    const { id: blogId, pid: index } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));
    const { isLoading, isFetching, data: post } = useGetPostByIndexQuery(blogId, index)
    const { mutate: deletePostMutate } = useDeletePostMutation();

    const handleDeletePost = useCallback((id) => {
        deletePostMutate(id);
    }, [deletePostMutate])

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

    return <Post
        post={post}
        user={user}
        blogId={blogId}
        handleDeletePost={handleDeletePost}
    />
}

export default PostForm;