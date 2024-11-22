import React from 'react';
import { useSelector } from 'react-redux';
import BlogHome from '../../components/blog/BlogHome';

const BlogHomeForm = () => {
    const { blogName } = useSelector(({ blog }) => ({
        blogName: blog.blogName
    }))

    return <BlogHome blogName={blogName}/>;
}

export default BlogHomeForm;