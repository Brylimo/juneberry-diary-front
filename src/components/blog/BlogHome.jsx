import React, { useCallback, useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostListQuery } from '../../hooks/queries/post/useGetPostListQuery';
import Pagination from '../common/Pagination';

const BlogHomeWrapper = styled.div`
    width: 100%;
    margin-top: 8rem;
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
    align-items: center;
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
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #d0d7de;
    padding: 30px 0;
    gap: 78px;
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

const PostCardThumbnailBlock = styled.div`
    width: 210px;
    height: 148px;
`;

const PostCardThumbnailImg = styled.img`
    width: 100%;
    height: 100%;
`

const PostCardConfigBlock = styled.div`
    background-color: #e9ecef;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PostCardConfigImg = styled.img`
    width: 45%;
`

const PortfolioBtn = styled.button`
    display: flex;
    align-items: center;
    height: 80%;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    padding: 3px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    letter-spacing: 1px;
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
    padding: 3px 6px;
    ${props => props.bgColor &&
        css`
            background-color: ${props.bgColor};
        `
    }

    &:hover {
        ${props => props.hoverColor &&
            css`
                background-color: ${props.hoverColor};
            `
        }
    }
`;

const BlogHome  = () => {
    const { id: paramId } = useParams()
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5);
    const { data } = useGetPostListQuery({blogId: paramId, page: page - 1, isTemp: false, isPublic: true, size: limit})

    const onClickPostCard = useCallback((index) => {
        if (index) {
            navigate(`/blog/${paramId}/${index}`)
        }
    }, [navigate, paramId])

    const onClickPortfolio = useCallback(() => {
        navigate(`/blog/${paramId}/about`)
    }, [navigate, paramId])

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries({ queryKey: ["getPostList"]});
        }
    }, [queryClient])

    return (
        <BlogHomeWrapper>
            <BlogHomeBlock>
                <BlogHomeHeader>
                    <HeaderTxt>전체글</HeaderTxt>
                    { paramId === 'tourist0302' ?
                        <PortfolioBtn onClick={onClickPortfolio} bgColor={"#f6f6f7"} hoverColor={"#e0e0e0"}>포트폴리오</PortfolioBtn> : null
                    }
                </BlogHomeHeader>
                <PostCardUl>
                    {data?.postInfoList && data?.postInfoList.map(post => (
                        <PostCardLi key={post.postId} onClick={() => onClickPostCard(post.index)}>
                            <PostCardTxtBlock>
                                <PostCardTitle>{post.title}</PostCardTitle>
                                <PostCardDesc>{post.description}</PostCardDesc>
                            </PostCardTxtBlock>
                            <PostCardThumbnailBlock>
                                {post.thumbnailPath ?
                                 (<PostCardThumbnailImg src={post.thumbnailPath}/>) : 
                                 (<PostCardConfigBlock>
                                    <PostCardConfigImg alt="img icon" src="/image-icon.svg"/>
                                 </PostCardConfigBlock>)}
                            </PostCardThumbnailBlock>
                        </PostCardLi>
                    ))}
                </PostCardUl>
            </BlogHomeBlock>
            <Pagination 
                total={data?.totalCount}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </BlogHomeWrapper>)
}

export default BlogHome;