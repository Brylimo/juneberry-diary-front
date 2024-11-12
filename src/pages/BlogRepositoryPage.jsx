import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogRepositoryForm from '../containers/blog/BlogRepositoryForm';

const BlogRepositoryPage = () => {
    return (
        <>
            <Helmet>
                <title>블로그 저장소</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%', marginBottom: '7rem' }}>
                <BlogRepositoryForm />
            </div>
        </>
    )
}

export default BlogRepositoryPage;