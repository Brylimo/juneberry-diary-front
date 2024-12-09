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
    const [loading, setLoading] = useState(true);
    const [isVoid, setIsVoid] = useState(false);

    const { user, blogId } = useSelector(({ user, blog }) => ({
        user: user.user,
        blogId: blog.blogId
    }));

    const { isPending: apiPending, isFetching: apiFetching, data: fetchedBlog } = useGetBlogByIdQuery(id, Boolean(!blogId || blogId !== id));

    console.log("crown", (!blogId || blogId !== id), blogId, id);
    useEffect(() => {
        if (!user) {
            console.log("user line")
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await authAPI.validate();
                    if (response.status === 200) {
                        dispatch(signin(response.data?.data));
                        dispatch(initializeEventHash());
                        queryClient.removeQueries();
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false)
                }
            };

            fetchData();
        } else {
            setLoading(false)
        }
    }, [user, dispatch, navigate, queryClient]);

    useEffect(() => {
        if (apiPending || apiFetching) {
            // 로딩 중일 때는 아무 처리도 하지 않음
            return;
        }

        if (fetchedBlog && typeof fetchedBlog === 'object' && !Array.isArray(fetchedBlog)) {
            dispatch(storeBlog({
                blogId: fetchedBlog.blogId,
                blogName: fetchedBlog.blogName
            }))
            setIsVoid(false)
        } else if (fetchedBlog) {
            setIsVoid(true)
        }
    }, [fetchedBlog, dispatch, apiFetching, apiPending])

    useEffect(() => {
        if (id && blogId !== id) {
            queryClient.invalidateQueries(["getBlogById", { id }]);
        }
    }, [id, blogId, queryClient]);

    if (loading || apiPending || apiFetching) {
        //return "로딩중입니다....";
        console.log("apt", (loading || apiPending || apiFetching), loading, apiPending, apiFetching, blogId !== id)
        return null;
    }

    console.log("pass")
    if (isVoid || !id || blogId !== id) return <NotFoundPage />
    
    return <Outlet />
}