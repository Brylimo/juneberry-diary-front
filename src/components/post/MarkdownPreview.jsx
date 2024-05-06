import React from 'react';
import styled from 'styled-components';

const PublishPage = styled.div`
    width: 893px;
    margin: 0 auto;
    background-color: #fffcfb;
    padding: 6rem 5rem 0 5rem;
    height: 100%;
    flex: 1;

    @media (max-width: 893px) {
        width: 100%;
    }
`;

const PreviewTitle = styled.div`
    font-size: 2rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid #e5e9f2;
    margin-bottom: 2rem;
    width: 100%;
    background: transparent;
    font-size: 32px;
`;

const MarkdownPrevew = () => {
    return (
        <PublishPage>
            <PreviewTitle>hi</PreviewTitle>
        </PublishPage>
    )
}

export default MarkdownPrevew;