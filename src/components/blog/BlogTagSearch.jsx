import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostListQuery } from '../../hooks/queries/post/useGetPostListQuery';
import { useGetAllTagsQuery } from '../../hooks/queries/tag/useGetAllTagsQuery';
import Pagination from '../common/Pagination';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const BlogTagSearchWrapper = styled.div`
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

const BlogTagSearchBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`

const AreaMain = styled.div`
    width: 70%;
    margin-top: 4rem;
`

const AreaSide = styled.div`
    width: 230px;
    margin: 32px 0 0 40px;

    ${({ theme }) => theme.md`
        display: none;
    `};
`

const SidebarTitle = styled.div`
    display: block;
    margin: 0 0 7px 0;
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
    color: #333;
`

const BlogTagSearchHeader = styled.div`
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
    gap: 10px;
`

const PostCardTxtBlock = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: calc(100% - 210px);

    ${({ theme }) => theme.md`
        width: calc(100% - 150px);
    `};

    ${({ theme }) => theme.xs`
        width: calc(100% - 110px);
    `};
`

const PostCardTitle = styled.div`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
`

const PostCardDesc = styled.div`
    font-size: 14px;
    word-wrap: break-word;
    word-break: break-word;
`

const PostTagBlock = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
`

const PostTagBadge = styled.div`
    background-color: #F5F5F5;
    color: green;
    font-size: 14px;
    padding: 0.1rem 1.5rem;
    border-radius: 7px;
    cursor: default;
    font-weight: 400;

    ${({ theme }) => theme.xs`
        font-size: 10px;
    `};
`;

const PostCardThumbnailBlock = styled.div`
    width: 210px;
    height: 148px;

    ${({ theme }) => theme.md`
        width: 150px;
        height: 105.71px;
    `};

    ${({ theme }) => theme.xs`
        width: 110px;
        height: 77.5pxpx;
    `};
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

// area-side
const TagBlock = styled.div`

`

const BoxTag = styled.div`
    white-space: normal;
`

const BlogTag = styled.span`
    display: inline-block;
    font-size: 13px;
    line-height: 1.69;
    margin-right: 4px;
    margin-bottom: 4px;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:hover {
        color: #bb86fc;
    }

    &:last-of-type::after {
        content: '';
        position: absolute;
        top: 12px;
        right: -2px;
        width: 6px;
        height: 6px;
        background: #fff;
    }
`


const BlogTagSearch = () => {
    const { id: blogId, tagname: tagName } = useParams()
    const navigate = useNavigate();

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5);
    const { data } = useGetPostListQuery({blogId: blogId, tagName: tagName, page: page - 1, isTemp: false, isPublic: true, size: limit})
    const { data: blogTagList } = useGetAllTagsQuery({blogId: blogId})

    const onClickPostCard = useCallback((index) => {
        if (index) {
            navigate(`/blog/${blogId}/${index}`)
        }
    }, [navigate, blogId])

    const onClickPortfolio = useCallback(() => {
        navigate(`/blog/${blogId}/about`)
    }, [navigate, blogId])

    return (
        <>
            <Helmet>
                <title>'{tagName}' 태그의 글 목록</title>
            </Helmet>
            <BlogTagSearchWrapper>
                <BlogTagSearchBlock>
                    <AreaMain>
                        <BlogTagSearchHeader>
                            <HeaderTxt># {tagName}</HeaderTxt>
                            { blogId === 'tourist0302' ?
                                <PortfolioBtn onClick={onClickPortfolio} bgColor={"#f6f6f7"} hoverColor={"#e0e0e0"}>포트폴리오</PortfolioBtn> : null
                            }
                        </BlogTagSearchHeader>
                        <PostCardUl>
                            {data?.postInfoList && data?.postInfoList.map(post => (
                                <PostCardLi key={post.postId} onClick={() => onClickPostCard(post.index)}>
                                    <PostCardTxtBlock>
                                        <PostCardTitle>{post.title}</PostCardTitle>
                                        <PostCardDesc>{post.description}</PostCardDesc>
                                        <PostTagBlock>
                                            {post.tags?.map((tag) => (
                                                <PostTagBadge>{tag}</PostTagBadge>
                                            ))}
                                        </PostTagBlock>
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
                    </AreaMain>
                    <AreaSide>
                        <TagBlock>
                            <SidebarTitle>Tag</SidebarTitle>
                            <BoxTag>
                            {
                                blogTagList?.map(tag => (
                                    <BlogTag>
                                        <Link to={`/blog/${blogId}/tag/${tag.name}`}>
                                            {tag.name}, 
                                        </Link>
                                    </BlogTag>
                                ))
                            }
                            </BoxTag>
                        </TagBlock>
                    </AreaSide>
                </BlogTagSearchBlock>
                <Pagination 
                    total={data?.totalCount}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </BlogTagSearchWrapper>
        </>
    )
}

export default BlogTagSearch;