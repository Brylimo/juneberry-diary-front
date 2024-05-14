import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { languages } from '@codemirror/language-data';
import { EditorView, rectangularSelection, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import Toolbar from './Toolbar';
import AddLink from './AddLink';
import richEditor from '../../plugins/rich-markdoc';
import config from '../../configs/markdoc'
import { Table } from '@lezer/markdown';
import { markdownLanguage } from '@codemirror/lang-markdown';

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
    position: relative;

    & .cm-editor {
        font-size: 16px;
        & .cm-scroller {
            overflow: hidden;
        }

        &.cm-focused {
            outline: none !important;
        }

        & .cm-markdoc-hidden {
            display: none;
        }
          
        & .cm-markdoc-bullet * {
            display: none;
        }
          
        & .cm-markdoc-bullet::after {
            display: inline !important;
            color: darkgray;
            content: '•';
        }
          
        & .cm-markdoc-renderBlock {
            font-family: sans-serif;
        }
          
        & .cm-markdoc-renderBlock table {
            border-collapse: collapse;
            margin-left: 5px;
        }
          
        & .cm-markdoc-renderBlock th,
        & .cm-markdoc-renderBlock td {
            border: 1px solid lightgray;
            padding: 5px 10px;
        }
          
        & .cm-markdoc-renderBlock blockquote {
            border-left: 3px solid lightgray;
            padding-left: 10px;
            margin: 0 0 0 15px;
        }
          
        & .cm-markdoc-renderBlock p {
            margin: 3px;
        }

        & .cm-markdoc-renderBlock img {
            width: 100%;
        }
          
        & .cm-markdoc-tag {
            color: darkgray;
        }
          
        & .cm-markdoc-fallbackTag {
            border: 2px solid rgb(97, 70, 155);
            border-radius: 3px;
            margin: 0 5px;
        }
          
        & .cm-markdoc-fallbackTag--name {
            background-color: rgb(97, 70, 155);
            color: white;
            padding: 5px;
        }
          
        & .cm-markdoc-fallbackTag--inner {
            padding: 10px;
        }
          
        & .cm-markdoc-callout {
            border: 1px solid rgb(227, 232, 238);
            background: rgb(247, 250, 252);
            border-radius: 3px;
            display: flex;
            padding: 10px;
            margin: 0 5px;
        }
          
        & .cm-markdoc-callout .icon {
            font-size: 24px;
            margin-right: 10px;
            color: rgb(164, 205, 254);
        }
          
        & .cm-markdoc-callout--warning {
            background-color: rgb(252, 249, 233);
            border-color: rgb(249, 229, 185);
        }
          
        & .cm-markdoc-callout--warning .icon {
            color: rgb(229, 153, 62);
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
      selection: '#036dd626',
      selectionMatch: '#b9ebe9',
      gutterBackground: '#FFFFFF',
      gutterForeground: '#4D4D4C',
      gutterBorder: '#dddddd',
      gutterActiveForeground: '',
      lineHighlight: '#8a91991a',
    },
    styles: [
      { tag: t.comment, color: '#787b80' },
      { tag: t.definition(t.typeName), color: '#194a7b' },
      { tag: t.typeName, color: '#194a7b' },
      { tag: t.tagName, color: '#008a02' },
      { tag: t.variableName, color: '#1a00db' }
    ],
});

const MarkdownEditor = ({ onChangeField, title, mrkdown }) => {
    const [titleHeight, setTitleHeight] = useState(0)
    const [linkBoxInfo, setLinkBoxInfo] = useState({
        top: 0,
        left: 0,
        isActive: false
    })
    const [linkTxt, setLinkTxt] = useState('');
    const titleElement = useRef(null)
    const codemirrorBlockRef = useRef(null)
    const codemirrorRef = useRef(null)
    const addLinkBlockRef = useRef(null)

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    }

    const onChangeMrkdown = useCallback((val, viewUpdate) => {
        onChangeField({ key: 'mrkdown', value: val})
    }, [onChangeField])

    const onClickAddLinkCancel = useCallback(() => {
        setLinkTxt("")
        setLinkBoxInfo(prevState => {
            return {
                ...prevState,
                isActive: false
            }
        })
    }, [setLinkBoxInfo])

    const onToolbarItemClick = useCallback((mode) => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;

        const view = codemirror.view.viewState;
        const cursor = view.state.selection.main.head;
        const curLineObj = view.state.doc.lineAt(cursor);
        const selectionObj = {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to
        }

        let line = ""
        if (view.state.doc.lines <= 32) {
            line = view.state.doc.text[curLineObj.number - 1];
        } else {
            line = view.state.doc.children[parseInt((curLineObj.number - 1) / 32)].text[(curLineObj.number - 1) % 32]
        }

        const controllers = {
            ...[1, 2, 3, 4]
                .map((number) => () => {
                    const characters = '#'.repeat(number);
                    const plain = line.replace(/#{1,6} /, '')
                    codemirror.view.dispatch({ changes: {from: curLineObj.from, to: curLineObj.to, insert: `${characters} ${plain}`} })
                    codemirror.view.focus();
                })
                .reduce((headingHandlers, handler, index) => {
                    return Object.assign(headingHandlers, {
                        [`heading${index + 1}`]: handler,
                    });
                }, {}),
            bold: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length > 0) {
                    if (/\*\*(.*)\*\*/.test(selectedTxt)) {
                        const filterdSelectedTxt = selectedTxt.replace(/\*\*/g, '')
                        codemirror.view.dispatch(view.state.replaceSelection(filterdSelectedTxt))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to - 4}})    
                    } else{
                        codemirror.view.dispatch(view.state.replaceSelection(`**${selectedTxt}**`))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to + 4}})
                    }
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection('**텍스트**'))
                    codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 2, head: selectionObj.to + 5}})
                }
                codemirror.view.focus();
            },
            italic: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length > 0) {
                    if (/\*(.*)\*/.test(selectedTxt)) {
                        const filterdSelectedTxt = selectedTxt.replace(/\*/g, '')
                        codemirror.view.dispatch(view.state.replaceSelection(filterdSelectedTxt))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to - 2}})    
                    } else{
                        codemirror.view.dispatch(view.state.replaceSelection(`*${selectedTxt}*`))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to + 2}})
                    }
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection('*텍스트*'))
                    codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 1, head: selectionObj.to + 4}})
                }
                codemirror.view.focus();
            },
            strike: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length > 0) {
                    if (/~~(.*)~~/.test(selectedTxt)) {
                        const filterdSelectedTxt = selectedTxt.replace(/^~~/, '').replace(/~~$/, '')
                        codemirror.view.dispatch(view.state.replaceSelection(filterdSelectedTxt))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to - 4}})    
                    } else{
                        codemirror.view.dispatch(view.state.replaceSelection(`~~${selectedTxt}~~`))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to + 4}})
                    }
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection('~~텍스트~~'))
                    codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 2, head: selectionObj.to + 5}})
                }
                codemirror.view.focus();
            },
            quote: () => {
                codemirror.view.dispatch({ selection: {anchor: curLineObj.from, head: curLineObj.to}})

                if (/^> /.test(line)) {
                    codemirror.view.dispatch(view.state.replaceSelection(line.replace(/^> /, '')))
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection(`> ${line}`))
                }
                codemirror.view.focus();
            },
            code: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length === 0) {
                    if (cursor !== 0) {
                        codemirror.view.dispatch(view.state.replaceSelection('\n```\n코드를 입력하세요\n```'))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 5, head: selectionObj.to + 14}})
                    } else {
                        codemirror.view.dispatch(view.state.replaceSelection('```\n코드를 입력하세요\n```'))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 4, head: selectionObj.to + 13}})
                    }
                } else {
                    if (selectionObj.from !== 0) {
                        codemirror.view.dispatch(view.state.replaceSelection(
                            `
\`\`\`
${selectedTxt}
\`\`\``))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 5, head: selectionObj.to + 5}})
                    } else {
                        codemirror.view.dispatch(view.state.replaceSelection(
                            `\`\`\`
${selectedTxt}
\`\`\``))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 4, head: selectionObj.to + 4}})
                    }
                }
                codemirror.view.focus();
            },
            link: () => {
                const {top, left} = codemirror.view.coordsAtPos(cursor)
                const lineHeight = codemirror.view.defaultLineHeight;
                const scrollHeight = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                
                setLinkBoxInfo({
                    top: (top + lineHeight + scrollHeight - codemirrorBlockRef.current.offsetTop - 80) + '',
                    left: (left - codemirrorBlockRef.current.offsetLeft) + '',
                    isActive: true
                })
            }
        }
        const controller = controllers[mode];
        if (!controller) return;

        controller()
    }, [])

    const onClickAddLinkSubmit = useCallback((e) => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;

        const view = codemirror.view.viewState;
        const cursor = view.state.selection.main.head;
        const curLineObj = view.state.doc.lineAt(cursor);

        alert(linkTxt)
    }, [linkTxt])

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
                <CodeMirrorBlock ref={codemirrorBlockRef}>
                    {linkBoxInfo.isActive && 
                        <AddLink 
                            linkTxt={linkTxt} 
                            top={linkBoxInfo.top} 
                            left={linkBoxInfo.left} 
                            addLinkBlockRef={addLinkBlockRef} 
                            onClickAddLinkSubmit={onClickAddLinkSubmit} 
                            onClickAddLinkCancel={onClickAddLinkCancel}
                            setLinkTxt={setLinkTxt}
                        />
                    }
                    <CodeMirror   
                        ref={codemirrorRef}
                        height="100%"
                        placeholder='내용을 입력하세요..'
                        basicSetup={{
                            lineNumbers: false,
                            foldGutter: false,
                            highlightActiveLine: true,
                            highlightSelectionMatches: false,
                            drawSelection: true,
                            indentOnInput: true,
                        }}
                        theme={myTheme}
                        value={mrkdown}
                        extensions={[
                            richEditor({
                                markdoc: config,
                                lezer: {
                                    base: markdownLanguage,
                                    codeLanguages: languages,
                                    extensions: [Table]
                                }
                            }),
                            EditorView.lineWrapping,
                            history(),
                            rectangularSelection(),
                            syntaxHighlighting(defaultHighlightStyle),
                            keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap])
                        ]}
                        onChange={onChangeMrkdown}
                    />
                </CodeMirrorBlock>
            </PublishPage>
        </>
    )
}

export default MarkdownEditor;