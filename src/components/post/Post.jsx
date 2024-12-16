import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHtml2Pdf } from '../../hooks/useHtml2Pdf';
import { Helmet } from "react-helmet-async";
import MarkdownRenderer from './MarkdownRenderer';
import DownloadIcon from '@mui/icons-material/Download';
import DisplayAds from '../ad/DisplayAds';

const PostWrapper = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

const PostBlock = styled.div`
    margin-top: 32px;
    max-width: 800px;
    padding: 0 20px;
    width: 100%;
`

const PostHeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`

const PostTitle = styled.div`
    font-size: 36px;
    font-weight: 600;
    color: #111;
`

const PostCategory = styled.div`
    font-size: 14px;
    height: 25px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-weight: 400;
`

const PostCategorySpan = styled.span`
    padding: 6px 0 0 0;
    color: #808080;
    letter-spacing: 1px;
    border-bottom: 1px solid #a3a3a3
`

const PostWriterBlock = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 18px;
`;

const PostWriterSemiBlock = styled.div`
    display: flex;
    gap: 5px;
`

const PostWriter = styled.div`
    font-size: 14px;
    color: #111;
`

const PostContentBlock = styled.div`
    width: 100%;
`

const PostTagBlock = styled.div`
    margin: 25px 0 35px 0;
    padding: 27px 0 0 0;
    display: flex;
    gap: 5px;
`

const PostTagBadge = styled.div`
    background-color: #fff;
    color: #959595;
    border: 1px solid #d1d1d1;
    font-size: 14px;
    padding: 0.1rem 1.5rem;
    border-radius: 13px;
    cursor: default;
    font-weight: 400;
`;

const DownloadIconCustom = styled(DownloadIcon)`
    width: 18px;
    height: 18px;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
`;

const Post = ({ post, user, blogId, handleDeletePost }) => {
    const [ pdfRef, convertToPdf ] = useHtml2Pdf();

    const formatDate = useCallback((date) => {
        if (!date) return null;

        const [datePart] = date.split(' ');
        const [year, month, day] = datePart.split('.').map(Number);

        return `${year}년 ${month}월 ${day}일`;
    }, [])

    if (Array.isArray(post) && post.length === 0) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>{post?.title}</title>
            </Helmet>
            <PostWrapper>
                <PostBlock ref={pdfRef}>
                    <PostHeaderBlock>
                        <PostCategory>
                            {post?.category && (<PostCategorySpan>
                                {post?.category} 
                                {post?.subCategory ? ` / ${post?.subCategory}` : null}
                            </PostCategorySpan>)}
                        </PostCategory>
                        <PostTitle>{post?.title}</PostTitle>
                        <PostWriterBlock>
                            <PostWriter><b>{blogId}</b> · {formatDate(post?.registeredDateTime)}</PostWriter>
                            {user ? (
                            <PostWriterSemiBlock>
                                <PostWriter>
                                    <Link to={`/blog/${blogId}/publish?id=${post?.id}`}>수정</Link>
                                </PostWriter>
                                <PostWriter onClick={() => handleDeletePost(post?.id)} style={{cursor: 'pointer'}}>삭제</PostWriter>
                                <DownloadIconCustom onClick={() => convertToPdf(post?.title)} />
                            </PostWriterSemiBlock>) : null}
                        </PostWriterBlock>
                    </PostHeaderBlock>
                    {/*<DisplayAds/>*/}
                    <PostContentBlock>
                        <MarkdownRenderer markdown={post?.content}/>
                    </PostContentBlock>
                    <PostTagBlock>
                        {post?.tags.map(tag => (
                            <PostTagBadge>
                                <Link to={`/blog/${blogId}/tag/${tag}`}>
                                    {tag}
                                </Link>
                            </PostTagBadge>
                        ))}
                    </PostTagBlock>
                </PostBlock>
            </PostWrapper>
        </>
    )
}

export default React.memo(Post);