import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogManageCategoryForm from '../containers/blog/BlogManageCategoryForm';

const BlogManageCategoryPage = () => {
    return (
        <>
            <Helmet>
                <title>카테고리 관리</title>
            </Helmet>
            <BlogManageCategoryForm />
        </>
    )
}

export default BlogManageCategoryPage;