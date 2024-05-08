import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import Toolbar from './Toolbar';

const PublishPage = styled.div`
    width: 893px;
    margin: 0 auto;
    background-color: #fffcfb;
    padding: 7.5rem 5rem 0 5rem;
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
`;

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
    const codemirrorRef = useRef(null)

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    }

    const onChangeMrkdown = useCallback((val, viewUpdate) => {
        onChangeField({ key: 'mrkdown', value: val})
    }, [onChangeField])

    const onToolbarItemClick = useCallback((mode) => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;

        const view = codemirror.view.viewState;
        const cursor = view.state.selection.main.head;
        const curLineObj = view.state.doc.lineAt(cursor);
        const selection = {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to
        }
        const line = view.state.doc.text[curLineObj.number - 1];

        const controllers = {
            ...[1, 2, 3, 4]
                .map((number) => () => {
                    const characters = '#'.repeat(number);
                    const plain = line.replace(/#{1,6} /, '')
                    codemirror.view.dispatch({ changes: {from: curLineObj.from, to: curLineObj.to, insert: `${characters} ${plain}`} })
                })
                .reduce((headingHandlers, handler, index) => {
                    return Object.assign(headingHandlers, {
                        [`heading${index + 1}`]: handler,
                    });
                }, {}),
        }
        const controller = controllers[mode];
        if (!controller) return;

        controller()
    }, [])

    useEffect(() => {
        if (titleElement.current) {
            const { scrollHeight, clientHeight } = titleElement.current;
            
            if (scrollHeight !== clientHeight) {
                setTitleHeight(`${scrollHeight}px`);
            } else {
                setTitleHeight(`${scrollHeight - 37}px`);
            }
        }
    }, [title])

    return (
        <>
            <Toolbar onToolbarItemClick={onToolbarItemClick} />
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
                        ref={codemirrorRef}
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
        </>
    )
}

export default MarkdownEditor;