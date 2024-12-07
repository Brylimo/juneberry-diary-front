import React from 'react';
import { useSelector } from 'react-redux';
import BlogManageSection from '../../components/section/BlogManageSection';

const BlogManageSectionForm = () => {
    const { blogName } = useSelector(({ blog }) => ({
        blogName: blog.blogName
    }))

    return <BlogManageSection 
        blogName={blogName}
    />
}

export default BlogManageSectionForm;