import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { signin } from '../../modules/user';
import { storeBlog } from '../../modules/blog';
import { initializeEventHash } from '../../modules/cal';
import { useGetBlogByIdQuery } from '../../hooks/queries/blog/useGetBlogByIdQuery';
import { useQueryClient } from '@tanstack/react-query';
import * as authAPI from '../../lib/api/authAPI';
import { NotFoundPage } from '../../pages';

export const BlogRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [isVoid, setIsVoid] = useState(false);

    const { user, blogId } = useSelector(({ user, blog }) => ({
        user: user.user,
        blogId: blog.blogId
    }));

    const { isPending: apiPending, data: fetchedBlog } = useGetBlogByIdQuery(id, true);

    useEffect(() => {
        if (!user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await authAPI.validate();
                    if (response.status === 200) {
                        dispatch(signin(response.data?.data));
                        dispatch(initializeEventHash());
                        queryClient.removeQueries();
                    }
                } catch (e) {}
                setLoading(false);
            };

            fetchData();
        }
    }, [user, dispatch, navigate, queryClient]);

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

    if (!isVoid && (loading || apiPending || blogId !== id)) {
        return "로딩중입니다....";
    }

    if (isVoid) return <NotFoundPage />
    
    return <Outlet />
}