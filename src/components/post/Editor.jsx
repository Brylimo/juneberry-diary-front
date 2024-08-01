import React from 'react';
import styled from 'styled-components';
import MarkdownEditorForm from '../../containers/post/MarkdownEditorForm';
import MarkdownConfirmForm from '../../containers/post/MarkdownConfirmForm';

const EditorFrameWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 8rem;
    background-color: #F9F9F9;
    height: auto;
    min-height: calc(100vh - 8rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ConfirmFrameWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 8rem;
    min-height: calc(100vh - 8rem);
    height: auto;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #F8F9FA;
`

const Editor = ({ submitActive }) => {
    if (submitActive) {
        return (
        <ConfirmFrameWrapper>
            <MarkdownConfirmForm />
        </ConfirmFrameWrapper>)
    } else {
        return (
        <EditorFrameWrapper>
            <MarkdownEditorForm />
        </EditorFrameWrapper>)
    }
};

export default Editor;