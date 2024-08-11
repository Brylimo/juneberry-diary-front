import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBlogField } from '../../modules/blog';
import { useGetBlogByIdQuery } from '../../hooks/queries/blog/useGetBlogByIdQuery';
import useDebounce from '../../hooks/useDebounce';
import BlogJoin from '../../components/blog/BlogJoin';

const BlogJoinForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))
    const [blogId, setBlogId] = useState("")
    const [apiEnabled, setApiEnabled] = useState(false)
    const [confirmActive, setConfirmActive] = useState(false)
    const [isPending, debouncedValue] = useDebounce(blogId, 1000)

    const { data: blog } = useGetBlogByIdQuery(debouncedValue, apiEnabled);

    const handleBlogIdInput = useCallback((e) => {
        if (e.target.value?.length <= 35) {
            setBlogId(e.target.value)
        }
        if (e.target.value?.length > 0) {
            setApiEnabled(true)
            setConfirmActive(true)
        } else {
            setApiEnabled(false)
            setConfirmActive(false)
        }
    }, [])

    console.log("blog", blog)

    return <BlogJoin 
                user={user}
                blogId={blogId}
                confirmActive={confirmActive}
                setBlogId={setBlogId}
                handleBlogIdInput={handleBlogIdInput} 
            />
}

export default BlogJoinForm;