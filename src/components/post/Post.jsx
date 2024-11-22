import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MarkdownRenderer from './MarkdownRenderer';

const PostWrapper = styled.div`
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

const Post = ({ post, user, blogId, handleDeletePost }) => {
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
        <PostWrapper>
            <PostBlock>
                <PostHeaderBlock>
                    <PostTitle>{post?.title}</PostTitle>
                    <PostWriterBlock>
                        <PostWriter><b>{blogId}</b> · {formatDate(post?.registeredDateTime)}</PostWriter>
                        {user ? (
                        <PostWriterSemiBlock>
                            <PostWriter>
                                <Link to={`/blog/${blogId}/publish?id=${post?.id}`}>수정</Link>
                            </PostWriter>
                            <PostWriter onClick={() => handleDeletePost(post?.id)} style={{cursor: 'pointer'}}>삭제</PostWriter>
                        </PostWriterSemiBlock>) : null}
                    </PostWriterBlock>
                </PostHeaderBlock>
                <PostContentBlock>
                    <MarkdownRenderer markdown={post?.content}/>
                </PostContentBlock>
            </PostBlock>
        </PostWrapper>
    )
}

export default React.memo(Post);