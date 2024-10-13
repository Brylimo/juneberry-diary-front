import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { storeBlog } from '../../modules/blog';
import { useGetBlogByIdQuery } from '../../hooks/queries/blog/useGetBlogByIdQuery';
import { NotFoundPage } from '../../pages';

export const ProtectedBlogRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isVoid, setIsVoid] = useState(false)

    const { blogId } = useSelector(({ blog }) => ({
        blogId: blog.blogId
    }));

    const { isPending: apiPending, data: fetchedBlog } = useGetBlogByIdQuery(id, true);

    useEffect(() => {
        if (fetchedBlog && typeof fetchedBlog === 'object' && !Array.isArray(fetchedBlog)) {
            dispatch(storeBlog({
                blogId: fetchedBlog.blogId,
                blogName: fetchedBlog.blogName
            }))
        } else if (fetchedBlog) {
            setIsVoid(true)
        }
    }, [fetchedBlog, dispatch, navigate])

    if (!isVoid && (apiPending || blogId !== id)) {
        return "로딩중입니다....";
    }

    if (isVoid) return <NotFoundPage />

    return <Outlet />
}