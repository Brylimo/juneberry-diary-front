import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogJoinForm from '../containers/blog/BlogJoinForm';

const BlogJoinPage = () => {
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