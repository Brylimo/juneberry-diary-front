import React from 'react';
import styled from 'styled-components';
import MarkdownEditorForm from '../../containers/post/MarkdownEditorForm';
import MarkdownPreviewForm from '../../containers/post/MarkdownPreviewForm';

const FrameWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 8rem;
    background-color: #F9F9F9;
    height: auto;
    min-height: calc(100vh - 8rem);
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Editor = ({ previewActive }) => {
    return (
        <FrameWrapper>
            {previewActive ? <MarkdownPreviewForm /> : <MarkdownEditorForm /> }
        </FrameWrapper>
    );
};

export default Editor;