import React, {useState} from 'react';
import styled from 'styled-components';
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

const PostWrapper = styled.div`
    width: 100%;
    margin-top: 8rem;
    height: auto;
    min-height: calc(100vh - 8rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

const PostBlock = styled.div`
    margin-top: 32px;
    max-width: 800px;
    padding: 0 20px;
    width: 100%;
`

const PostHeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`

const PostTitle = styled.div`
    font-size: 36px;
    font-weight: 600;
    color: #111;
`

const PostWriter = styled.div`
    font-size: 13px;
    color: #111;
`

const PostContentBlock = styled.div`
    width: 100%;
`

const PostRenderBlock = styled.div`
    font-size: 16px;
    font-family: monospace;
    word-break: normal;
    word-wrap: break-word;

    & menu, ol, ul {
        list-style: auto;
        list-style-position: inside;
    }
`

function replaceEmptyLinesWithBr(text) {
    if (!text) return text;

    const lines = text.split('\n');

    const processedLines = lines.map((line, index) => {
        const isBlankLine = line.trim() === '';
        return isBlankLine ? '\u200B' : line;
    });
    const processedText = processedLines.join('\n');

    return processedText;
}

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

const Post = ({ post }) => {
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
            .processSync(replaceEmptyLinesWithBr(post?.content))
            .toString()
        )
    );

    return (
        <PostWrapper>
            <PostBlock>
                <PostHeaderBlock>
                    <PostTitle>{post?.title}</PostTitle>
                    <PostWriter>{post?.updatedDateTime}</PostWriter>
                </PostHeaderBlock>
                <PostContentBlock>
                    <Typography>
                        <PostRenderBlock
                            dangerouslySetInnerHTML={{ __html: htmlTxt }}
                        />
                    </Typography>
                </PostContentBlock>
            </PostBlock>
        </PostWrapper>
    )
}

export default React.memo(Post);