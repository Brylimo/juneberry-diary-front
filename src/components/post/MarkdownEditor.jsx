import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
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
import { useGetAllCategories } from '../../hooks/queries/blog/useGetAllCategories';
import SaveModalForm from '../../containers/post/SaveModalForm';
import CustomSelect from '../common/CustomSelect';

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

const MarkdownEditor = ({
    tempCntActive, 
    onChangeField,
    category,
    subCategory,
    title, 
    mrkdown,
    linkTxt,
    linkBoxInfo,
    codemirrorRef,
    codemirrorBlockRef,
    setLinkTxt,
    setTempCntActive,
    onToolbarItemClick,
    onClickAddLinkSubmit,
    onClickAddLinkCancel 
}) => {
    const { id: blogId } = useParams()

    const { data: categoryData } = useGetAllCategories(blogId)

    const [options, setOptions] = useState([{value: '', label: '카테고리 없음'}])
    const [titleHeight, setTitleHeight] = useState(0)
    const titleElement = useRef(null)
    const addLinkBlockRef = useRef(null)

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value })
    }

    const onChangeMrkdown = useCallback((val, viewUpdate) => {
        onChangeField({ key: 'mrkdown', value: val})
    }, [onChangeField])

    const handleChange = (option) => {
        const values = option.value.split('-');

        if (values.length === 1) {
            onChangeField({ key: 'category', value: values[0]})
        } else if (values.length === 2) {
            onChangeField({ key: 'category', value: values[0]})
            onChangeField({ key: 'subCategory', value: values[1]})
        }
    };

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

    useEffect(() => {
        if (categoryData) {
            const optionList = []

            categoryData.forEach((item, index) => {
                if (item.categoryName === '') {
                    optionList.push({
                        value: '',
                        selectedLabel: "카테고리",
                        label: "카테고리 없음"
                    })
                } else {
                    
                    // 1차. 카테고리
                    optionList.push({
                        value: item.categoryName,
                        selectedLabel: item.categoryName,
                        label: item.categoryName
                    })

                    // 2차. 하위 카테고리
                    item.children.filter(subItem => !!subItem.subCategoryName).forEach((subItem) => {
                        optionList.push({
                            value: `${item.categoryName}-${subItem.subCategoryName}`,
                            selectedLabel: subItem.subCategoryName,
                            label: `- ${subItem.subCategoryName}`
                        })
                    })
                }
            })

            setOptions(optionList)
        }
    }, [categoryData])

    return (
        <>
            <Toolbar onToolbarItemClick={onToolbarItemClick} />
            <PublishPage>
                <CustomSelect
                    placeholder={subCategory ? subCategory : (category ? category : "카테고리")}
                    options={options}
                    onChange={handleChange}
                />
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
            {tempCntActive && <SaveModalForm setActiveState={setTempCntActive} />}
        </>
    )
}

export default React.memo(MarkdownEditor);