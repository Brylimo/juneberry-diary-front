import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogRepositoriesForm from '../containers/blog/BlogRepositoriesForm';

const BlogRepositoriesPage = () => {
    return (
        <>
            <Helmet>
                <title>블로그 저장소</title>
            </Helmet>
            <BlogRepositoriesForm />
        </>
    )
}

export default BlogRepositoriesPage;