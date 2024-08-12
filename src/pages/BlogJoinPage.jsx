import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useQueryClient } from '@tanstack/react-query';
import BlogJoinForm from '../containers/blog/BlogJoinForm';

const BlogJoinPage = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => queryClient.removeQueries({ queryKey: ["getBlogById"], exact: false });
    }, [queryClient])
    
    return (
        <>
            <Helmet>
                <title>블로그 가입</title>
            </Helmet>
            <BlogJoinForm />
        </>
    )
}

export default BlogJoinPage;