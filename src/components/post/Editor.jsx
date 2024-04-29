import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';

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
`;

const EditorPage = styled.div`
    width: 893px;
    margin: 0 auto;
    background-color: #fffcfb;
    padding: 6rem 5rem;
    height: 100%;
    flex: 1;

    @media (max-width: 893px) {
        width: 100%;
    }
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid #e5e9f2;
    margin-bottom: 2rem;
    width: 100%;
    background: transparent;
    font-size: 32px;
    &::placeholder {
        color: #999999;
    }
`;
const QuillWrapper = styled.div`
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    
    .ql-editor b {
        font-weight: bold;
    }

    .ql-editor i {
        font-weight: bold;
    }

    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;

const Editor = () => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: "bubble",
            placeholder: "내용을 작성하세요...",
            modules: {
                toolbar: [
                    [{ header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: "ordered" }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },    
        });
    }, []);

    return (
        <FrameWrapper>
            <EditorPage>
                <TitleInput placeholder='제목' />
                <QuillWrapper>
                    <div ref={quillElement} />
                </QuillWrapper>
            </EditorPage>
        </FrameWrapper>
    );
};

export default Editor;