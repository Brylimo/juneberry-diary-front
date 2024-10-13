import React from 'react';
import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BlogRepositoryWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 8rem;
    height: auto;
    min-height: calc(100vh - 8rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

const BlogCardUl = styled.ul`
    width: 70%;
`

const BlogCardLi = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #d0d7de;
    padding: 30px 20px;
`

const BlogNameTxt = styled.span`
    font-size: 20px;
    font-weight: 600;
`


const BlogRepository = ({ blogList }) => {
    const navigate = useNavigate();

    const onClickBlogCard = useCallback((blogId) => {
        navigate(`/blog/${blogId}`);
    }, [navigate])


    return (
        <BlogRepositoryWrapper>
            <BlogCardUl>
                {blogList && blogList.map(blog => (
                    <BlogCardLi onClick={() => onClickBlogCard(blog.blogId)}>
                        <BlogNameTxt>{blog.blogName}</BlogNameTxt>
                        <div>{blog.intro}</div>
                    </BlogCardLi>
                ))}
            </BlogCardUl>
        </BlogRepositoryWrapper>)
}

export default BlogRepository;