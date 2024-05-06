import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
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

const TitleTextarea = styled.textarea`
    outline: none;
    padding: 0 0 0.5rem 0;
    border: none;
    border-bottom: 1px solid #e5e9f2;
    margin-bottom: 2rem;
    width: 100%;
    background: transparent;
    font-size: 32px;
    white-space: normal;
    word-wrap: break-word;
    word-break: normal;
    resize: none;
    overflow: hidden;
    min-height: 46px;

    &::placeholder {
        color: #999999;
    }

    ${props =>
        props.titleHeight && css`
            height: ${props.titleHeight}
        `
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
    const [titleHeight, setTitleHeight] = useState(0)
    const titleElement = useRef(null)

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    }

    const onChangeMrkdown = useCallback((val, viewUpdate) => {
        onChangeField({ key: 'mrkdown', value: val})
    }, [onChangeField])

    useEffect(() => {
        if (titleElement.current) {
            const { scrollHeight, clientHeight } = titleElement.current;
            console.log(scrollHeight)
            if (scrollHeight !== clientHeight) {
                setTitleHeight(`${scrollHeight}px`);
            } else {
                setTitleHeight(`${scrollHeight - 37}px`);
            }
        }
    }, [title])

    return (
        <PublishPage>
            <TitleTextarea
                ref={titleElement}
                placeholder='제목'
                onChange={onChangeTitle}
                value={title}
                titleHeight={titleHeight}
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
                    value={mrkdown}
                    extensions={[markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
                    onChange={onChangeMrkdown}
                />
            </CodeMirrorBlock>
        </PublishPage>
    )
}

export default MarkdownEditor;