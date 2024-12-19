import React from 'react';
import { useSelector } from 'react-redux';
import BlogCategorySearch from '../../components/blog/BlogCategorySearch';

const BlogCategorySearchForm = () => {
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))

    return <BlogCategorySearch user={user}/>
}

export default BlogCategorySearchForm;