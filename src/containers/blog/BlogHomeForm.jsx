import React from 'react';
import { useSelector } from 'react-redux';
import BlogHome from '../../components/blog/BlogHome';

const BlogHomeForm = () => {
    const { user, blogName } = useSelector(({ user, blog }) => ({
        user: user.user,
        blogName: blog.blogName
    }))

    return <BlogHome user={user} blogName={blogName}/>;
}

export default BlogHomeForm;