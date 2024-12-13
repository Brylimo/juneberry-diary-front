import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { initialize, storePost } from '../../modules/publish';
import { useGetPostByIndexQuery } from '../../hooks/queries/post/useGetPostByIndexQuery';
import { useDeletePostMutation } from '../../hooks/mutations/post/useDeletePostMutation';
import Post from '../../components/post/Post';

const PostForm = () => {
    const { id: blogId, pid: index } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));
    const { isLoading, isFetching, data: post } = useGetPostByIndexQuery(blogId, index)
    const { mutate: deletePostMutate } = useDeletePostMutation();

    const handleDeletePost = useCallback((id) => {
        if (window.confirm("정말 포스트를 삭제하시겠습니까?")) {
            deletePostMutate(id, {
                onSuccess: () => {
                    alert("삭제되었습니다.");
                    navigate(`/blog/${blogId}`);
                },
                onError: (error) => {
                    alert("삭제가 실패했습니다.");
                }
            });
        }
    }, [blogId, navigate, deletePostMutate])

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
                postTags: post.tags,
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