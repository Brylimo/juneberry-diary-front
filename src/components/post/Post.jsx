import React, {useState} from 'react';
import styled from 'styled-components';
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

const PostWriter = styled.div`
    font-size: 13px;
    color: #111;
`

const PostContentBlock = styled.div`
    width: 100%;
`

const Post = ({ post }) => {
    return (
        <PostWrapper>
            <PostBlock>
                <PostHeaderBlock>
                    <PostTitle>{post?.title}</PostTitle>
                    <PostWriter>{post?.updatedDateTime}</PostWriter>
                </PostHeaderBlock>
                <PostContentBlock>
                    <MarkdownRenderer markdown={post?.content}/>
                </PostContentBlock>
            </PostBlock>
        </PostWrapper>
    )
}

export default React.memo(Post);