import React, { useCallback, useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPostListQuery } from '../../hooks/queries/post/useGetPostListQuery';
import Pagination from '../common/Pagination';
import { Helmet } from "react-helmet-async";
import SettingsIcon from '@mui/icons-material/Settings';

const BlogHomeHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
`

const HeaderTxt = styled.div`
    font-size: 15px;
    padding: 8px 0;
    font-weight: 400;
`

const HeaderCnt = styled.span`
    color: #ef402f;
    line-height: 19px;
`

const PostCardUl = styled.ul`
    width: 100%;
`

const PostDefault = styled.div`
    margin-top: 25px;
`

const PostDefaultLi = styled.li`
    list-style-type: disc;
    padding-left: 7px;
    line-height: 2;
    font-size: 14px;
    color: rgba(51, 51, 51, 0.5);
`

const PostCardLi = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
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

    &:hover {
        text-decoration: underline;
    }
`

const PostCardDesc = styled.div`
    font-size: 14px;
    word-wrap: break-word;
    word-break: break-word;
`

const PostCategoryBlock = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 300;
`

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

const LeftSideBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const SettingIconCustom = styled(SettingsIcon)`
    cursor: pointer;
    color: #d0d7de;

    &:hover {
        color: black;
    }
`;

const BlogHome  = ({ user, blogName }) => {
    const { id: paramId } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const getPageFromParams = () => {
        const pageParam = searchParams.get("page");
        return pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;
    };

    const [page, setPage] = useState(getPageFromParams())
    const [limit, setLimit] = useState(5)

    const { isPending, isLoading, isFetching, data } = useGetPostListQuery({blogId: paramId, page: page - 1, isTemp: false, isPublic: true, size: limit})

    const onClickPostCard = useCallback((index) => {
        if (index) {
            navigate(`/blog/${paramId}/${index}`)
        }
    }, [navigate, paramId])

    const onClickPortfolio = useCallback(() => {
        navigate(`/blog/${paramId}/about`)
    }, [navigate, paramId])

    const onClickBlogSetting = useCallback(() => {
        navigate(`/blog/${paramId}/manage/category`);
    }, [navigate, paramId])

    const callback = (page) => {
        navigate(`/blog/${paramId}?page=${page}`)
        return
    }

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries({ queryKey: ["getPostList"]});
        }
    }, [queryClient])

    useEffect(() => {
        const newPage = getPageFromParams();
        if (page !== newPage) {
            setPage(newPage);
        }
    }, [searchParams, page]);

    if (isPending || isLoading || isFetching) {
        return null
    }

    return (
        <>
            <Helmet>
                <title>{blogName}</title>
            </Helmet>            
                <BlogHomeHeader>
                    <HeaderTxt>전체 글 <HeaderCnt>{data?.totalCount ? data?.totalCount : 0}</HeaderCnt></HeaderTxt>
                    <LeftSideBlock>
                        {user && <SettingIconCustom onClick={onClickBlogSetting} />}
                        { paramId === 'tourist0302' ?
                            <PortfolioBtn onClick={onClickPortfolio} bgColor={"#f6f6f7"} hoverColor={"#e0e0e0"}>포트폴리오</PortfolioBtn> : null
                        }
                    </LeftSideBlock>
                </BlogHomeHeader>
                <PostCardUl>
                    {(data?.postInfoList && 
                        data?.postInfoList.length > 0) ? 
                        data?.postInfoList.map(post => (
                            <PostCardLi key={post.postId} onClick={() => onClickPostCard(post.index)}>
                                <PostCardTxtBlock>
                                    <PostCardTitle>{post.title}</PostCardTitle>
                                    <PostCardDesc>{post.description}</PostCardDesc>
                                    <PostCategoryBlock>
                                        {post.category ? post.category : null} {(post.category && post.subCategory) ? `/ ${post.subCategory}` : null}
                                    </PostCategoryBlock>
                                </PostCardTxtBlock>
                                <PostCardThumbnailBlock>
                                    {post.thumbnailPath ?
                                    (<PostCardThumbnailImg src={post.thumbnailPath}/>) : 
                                    (<PostCardConfigBlock>
                                        <PostCardConfigImg alt="img icon" src="/image-icon.svg"/>
                                    </PostCardConfigBlock>)}
                                </PostCardThumbnailBlock>
                            </PostCardLi>
                        )) : (
                            <PostDefault>
                                <PostDefaultLi>선택하신 태그에 해당하는 글이 없습니다.</PostDefaultLi>
                                <PostDefaultLi>다른 태그를 사용하시거나, 검색 기능을 활용해 보세요.</PostDefaultLi>
                            </PostDefault>
                        )}
                </PostCardUl>
                    
                {(data?.postInfoList && data?.postInfoList.length > 0) ? (
                    <Pagination 
                        total={data?.totalCount}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        callback={callback}
                    />
                ) : null}
        </>)
}

export default BlogHome;