import React, {useState} from 'react';
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
`;

const PostWriterSemiBlock = styled.div`
    display: flex;
    gap: 5px;
`

const PostWriter = styled.div`
    font-size: 13px;
    color: #111;
`

const PostContentBlock = styled.div`
    width: 100%;
`

const Post = ({ post, user, blogId, handleDeletePost }) => {
    return (
        <PostWrapper>
            <PostBlock>
                <PostHeaderBlock>
                    <PostTitle>{post?.title}</PostTitle>
                    <PostWriterBlock>
                        <PostWriter>{post?.updatedDateTime}</PostWriter>
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