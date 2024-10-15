import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetPostListQuery } from '../../hooks/queries/post/useGetPostListQuery';

const BlogHomeWrapper = styled.div`
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

const BlogHomeBlock = styled.div`
    width: 70%;
    margin-top: 5rem;
`

const BlogHomeHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #7a583a;
`

const HeaderTxt = styled.div`
    font-size: 15px;
    padding: 8px 0;
    color: #7a583a;
`

const PostCardUl = styled.ul`
    width: 100%;
`

const PostCardLi = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #d0d7de;
    padding: 30px 0;
`

const PostCardTxtBlock = styled.div`
    display: flex;
    flex-direction: column;
`

const PostCardTitle = styled.div`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 2px;
`

const PostCardDesc = styled.div`
    font-size: 12px;
`

const BlogHome  = () => {
    const { id: paramId } = useParams()
    const [page, setPage] = useState(0)
    const { data: publicPostList } = useGetPostListQuery({blogId: paramId, page, isTemp: false, isPublic: true, size: 10})

    return (
        <BlogHomeWrapper>
            <BlogHomeBlock>
                <BlogHomeHeader>
                    <HeaderTxt>전체글</HeaderTxt>
                </BlogHomeHeader>
                <PostCardUl>
                    {publicPostList && publicPostList.map(post => (
                        <PostCardLi>
                            <PostCardTxtBlock>
                                <PostCardTitle>{post.title}</PostCardTitle>
                                <PostCardDesc>{post.description}</PostCardDesc>
                            </PostCardTxtBlock>
                        </PostCardLi>
                    ))}
                </PostCardUl>
            </BlogHomeBlock>
        </BlogHomeWrapper>)
}

export default BlogHome;