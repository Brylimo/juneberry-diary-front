import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Menu from './Menu';

const BlogHeaderBlock = styled.div`
    position: fixed;
    top: 0;
    z-index: 320;
    height: 7.4rem;
    width: 100%;
    background-color: white;
    box-shadow: inset 0 calc(max(1px, 0.0625rem)*-1) #d0d7de;
    display: flex;
`;

const BlogName = styled.div`

`

const BlogHeader = ({
    paramId,
    user,
    blogName,
    todoActive, 
    submitActive, 
    tempCnt,
    postUpdateDt,
    onLogout, 
    onClickTodoBtn, 
    onClickPostSave, 
    onClickPostSubmit,
    onClickPostGoBack,
    onClickTempCnt 
}) => {
    return (
        <BlogHeaderBlock>
            <BlogName>chaejin's blog</BlogName>
        </BlogHeaderBlock>
    )
}

export default BlogHeader;