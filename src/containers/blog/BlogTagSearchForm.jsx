import React from 'react';
import { useSelector } from 'react-redux';
import BlogTagSearch from '../../components/blog/BlogTagSearch';


const BlogTagSearchForm = () => {
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))

    return <BlogTagSearch user={user} />;
}

export default BlogTagSearchForm;