import React, {useState, useEffect} from 'react';
import BlogRepositories from '../../components/blog/BlogRepository';
import { useGetAllBlogs } from '../../hooks/queries/blog/useGetAllBlogs';

const BlogRepositoryForm = () => {
    const { data: blogList } = useGetAllBlogs();

    return <BlogRepositories 
            blogList={blogList}
        />;
}

export default BlogRepositoryForm;