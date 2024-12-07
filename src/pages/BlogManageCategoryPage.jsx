import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogManageCategory from '../components/blog/BlogManageCategory';

const BlogManageCategoryPage = () => {
    return (
        <>
            <Helmet>
                <title>카테고리 관리</title>
            </Helmet>
            <BlogManageCategory />
        </>
    )
}

export default BlogManageCategoryPage;