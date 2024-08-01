import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, {css} from 'styled-components';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from "remark-rehype";
import remarkBreak from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import sanitize from "sanitize-html";
import Typography from '../common/Typography';

const MarkdownConfirmWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const PostPreviewBlock = styled.div`
    flex: 1;
`;

const PostPreview = styled.div`
    padding: 3rem 2rem 2rem 3rem;
    height: calc(100vh - 8rem);
`

const PostConfigBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PostConfig = styled.div`
    padding: 3rem;
    height: 100%;
`;

const PreviewLine = styled.div`
    width: 0.1px;
    height: calc(100vh - 8rem);
    background-color: #d0d7de;
`

const PublishPage = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    background-color: #fffcfb;
    padding: 5rem 5rem 0 5rem;
    height: 100%;
    flex: 1;
    overflow: auto;
    height: calc(100% - 5rem);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 893px) {
        width: 100%;
    }
`;

const PreviewTitle = styled.div`
    outline: none;
    padding: 0, 0, 0.5rem 0;
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
    font-family: monospace;
    min-height: 46px;
    height: 42px;
    font-weight: 400;
`;

const MarkdonwRenderBlock = styled.div`
    font-size: 16px;
    font-family: monospace;
    word-break: normal;
    word-wrap: break-word;

    & menu, ol, ul {
        list-style: auto;
        list-style-position: inside;
    }
`;

const PostPreviewHeader = styled.div`
    font-weight: bold;
    font-size: 32px;
    color: cadetblue;
`;

const PostConfigContent = styled.div`
    margin-top: 2rem;
    height: calc(100% - 9rem);
`;

const PostConfigCell = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
`;

const PostConfigSegBlock = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const PostConfigImg = styled.div`
    background-color: #e9ecef;
    width: 65%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    ${
        props => props.height && css`
            height: ${props.height}px;    
        `
    };
`;

const ImgImage = styled.img`
    width: 45%;
`

const ImgBtn = styled.button`
    padding: 1rem 0;
    cursor: pointer;
    transition: all 0.125s ease-in 0s;
    background-color: #fff;
    color: green;
    border: none;
    width: 45%;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        opacity: 0.7
    }
`

const CellHeader = styled.div`
    font-size: 24px;
    display: flex;
    align-items: center;
    width: 109px;
`

const PostTextarea = styled.textarea`
    width: 65%;
    border: none;
    padding: 1rem;
    resize: none;
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const PostConfigBtnBlock = styled.div`
    height: 5rem;
    display: flex;
    justify-content: center;
`;

const PostPublishBtn = styled.button`
    padding: 1rem 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #28a745;
    color: #fff;
    border: none;
    height: 100%;
    width: 75%;
    border-radius: 5px;
`;

const sanitizeEventScript = (htmlString) => {
    return htmlString.replace(/ on\w+="[^"]*"/g, '');
}

const filter = (html) => {
    const eventSanitizedString = sanitizeEventScript(html);
    return sanitize(eventSanitizedString, {
        allowedTags: [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'blockquote',
            'p',
            'a',
            'ul',
            'ol',
            'nl',
            'li',
            'b',
            'i',
            'strong',
            'em',
            'strike',
            'code',
            'hr',
            'br',
            'div',
            'table',
            'thead',
            'caption',
            'tbody',
            'tr',
            'th',
            'td',
            'pre',
            'iframe',
            'span',
            'img',
            'del',
            'input',
          ],
          allowedAttributes: {
            a: ['href', 'name', 'target'],
            img: ['src'],
            iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
            '*': ['class', 'id', 'aria-hidden'],
            span: ['style'],
            input: ['type'],
            ol: ['start'],
          },
          allowedStyles: {
            '*': {
              // Match HEX and RGB
              color: [
                /^#(0x)?[0-9a-f]+$/i,
                /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
              ],
              'text-align': [/^left$/, /^right$/, /^center$/],
            }
          },
          allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io']
    })
}

const MarkdownConfirm = ({ title, mrkdown }) => {
    const [htmlTxt, setHtmlTxt] = useState(
        filter(
          unified()
            .use(remarkParse)
            .use(remarkBreak)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .processSync(mrkdown)
            .toString()
        )   
    );
    const [imgBlockWidth, setImgBlockWidth] = useState(0);
    const postConfigImgBlockRef = useRef(null);

    const updatePostConfigImgHeight = useCallback(() => {
        if (postConfigImgBlockRef.current) {
            const { width } = postConfigImgBlockRef.current.getBoundingClientRect();
            setImgBlockWidth(width);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', updatePostConfigImgHeight);

        return () => {
            window.removeEventListener('resize', updatePostConfigImgHeight);
        }
    }, [])

    return (
        <MarkdownConfirmWrapper>
            <PostPreviewBlock>
                <PostPreview>
                    <PostPreviewHeader>
                        포스트 미리보기
                    </PostPreviewHeader>
                    <PublishPage>
                        <PreviewTitle>{title}</PreviewTitle>
                        <Typography>
                            <MarkdonwRenderBlock
                                dangerouslySetInnerHTML={{ __html: htmlTxt }}
                            />
                        </Typography>
                    </PublishPage>
                </PostPreview>
            </PostPreviewBlock>
            <PreviewLine />
            <PostConfigBlock>
                <PostConfig>
                    <PostPreviewHeader>
                        포스트 설정
                    </PostPreviewHeader>
                    <PostConfigContent>
                        <PostConfigCell>
                            <CellHeader>
                                대표 이미지
                            </CellHeader>
                            <PostConfigSegBlock>
                                <PostConfigImg ref={postConfigImgBlockRef} height={imgBlockWidth * 0.6}>
                                    <ImgImage alt="img icon" src="/image-icon.svg" />
                                    <ImgBtn type="button">대표 이미지</ImgBtn>
                                </PostConfigImg>
                            </PostConfigSegBlock>
                        </PostConfigCell>
                        {/*<PostConfigCell>
                            <CellHeader>
                                태그
                            </CellHeader>
                            <PostConfigSegBlock>
                                <PostTextarea placeholder='#태그' rows='8' /> 
                            </PostConfigSegBlock> 
                        </PostConfigCell>*/}
                        <PostConfigCell>
                            <CellHeader>
                                설명
                            </CellHeader>
                            <PostConfigSegBlock>
                                <PostTextarea placeholder='포스트를 짧게 소개해보세요.' rows='8' /> 
                            </PostConfigSegBlock>
                        </PostConfigCell>
                    </PostConfigContent> 
                </PostConfig>
            </PostConfigBlock>
        </MarkdownConfirmWrapper>
    )
}

export default MarkdownConfirm;