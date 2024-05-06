import React, { useCallback } from 'react';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

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

const CodeMirrorBlock = styled.div`
    height: 100%;

    & .cm-editor {
        font-size: 16px;
        &.cm-focused {
            outline: none !important;
        }
    }
`

const myTheme = createTheme({
    dark: 'light',
    settings: {
      background: '#fffcfb',
      backgroundImage: '',
      foreground: '#4D4D4C',
      caret: '#AEAFAD',
      selection: '#D6D6D6',
      selectionMatch: '#D6D6D6',
      gutterBackground: '#FFFFFF',
      gutterForeground: '#4D4D4C',
      gutterBorder: '#dddddd',
      gutterActiveForeground: '',
      lineHighlight: '#EFEFEF',
    },
    styles: [
      { tag: t.comment, color: '#787b80' },
      { tag: t.definition(t.typeName), color: '#194a7b' },
      { tag: t.typeName, color: '#194a7b' },
      { tag: t.tagName, color: '#008a02' },
      { tag: t.variableName, color: '#1a00db' },
    ],
});

const MarkdownEditor = ({ onChangeField, title, mrkdown }) => {
    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    }

    const onChangeMrkdown = useCallback((val, viewUpdate) => {
        onChangeField({ key: 'markdown', value: val})
    }, [])

    return (
        <PublishPage>
            <TitleInput 
                placeholder='제목' 
                onChange={onChangeTitle}
                value={title}
            />
            <CodeMirrorBlock>
                <CodeMirror   
                    height="100%"
                    placeholder='내용을 입력하세요..'
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                        highlightActiveLine: false,
                        highlightSelectionMatches: false,
                    }}
                    theme={myTheme}
                    extensions={[markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
                    onChange={onChangeMrkdown}
                />
            </CodeMirrorBlock>
        </PublishPage>
    )
}

export default MarkdownEditor;