import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
    font-size: 2rem;
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

const Editor = ({ onChangeField, title, body }) => {
    const [quillText, setQuillText] = useState("");

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    }

    return (
        <FrameWrapper>
            <EditorPage>
                <TitleInput 
                    placeholder='제목' 
                    onChange={onChangeTitle}
                    value={title}
                />
                <QuillWrapper>
                    {/*<ReactQuill
                        theme="snow"
                        value={quillText}
                        onChange={e => setQuillText(e)}
                        placeholder='내용을 입력하세요'
                    />*/}
                </QuillWrapper>
            </EditorPage>
        </FrameWrapper>
    );
};

export default Editor;