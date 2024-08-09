import React from 'react';
import { useSelector } from 'react-redux';
import BlogJoin from '../../components/post/BlogJoin';

const BlogJoinForm = () => {
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))

    return <BlogJoin user={user} />
}

export default BlogJoinForm;