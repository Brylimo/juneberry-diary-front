import React from 'react';
import styled from 'styled-components';
import MarkdownEditorForm from '../../containers/post/MarkdownEditorForm';
import MarkdownConfirmForm from '../../containers/post/MarkdownConfirmForm';

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

const Editor = ({ submitActive }) => {
    return (
        <FrameWrapper>
            {submitActive ? <MarkdownConfirmForm /> : <MarkdownEditorForm /> }
        </FrameWrapper>
    );
};

export default Editor;