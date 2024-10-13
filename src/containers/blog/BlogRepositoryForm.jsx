import React, {useState, useEffect} from 'react';
import BlogRepositories from '../../components/blog/BlogRepository';
import { useGetAllBlogsByUser } from '../../hooks/queries/blog/useGetAllBlogsByUser';

const BlogRepositoryForm = () => {
    const { data: blogList } = useGetAllBlogsByUser();

    return <BlogRepositories 
            blogList={blogList}
        />;
}

export default BlogRepositoryForm;