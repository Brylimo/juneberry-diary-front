import React, { useState } from 'react';
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

const PreviewTitle = styled.div`
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid #e5e9f2;
    margin-bottom: 2rem;
    width: 100%;
    background: transparent;
    font-size: 32px;
    font-family: monospace;
    min-height: 46px;
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

const MarkdownPrevew = ({ title, mrkdown }) => {
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

    console.log(htmlTxt)
    return (
        <PublishPage>
            <PreviewTitle>{title}</PreviewTitle>
            <MarkdonwRenderBlock
                dangerouslySetInnerHTML={{ __html: htmlTxt }}
            />
        </PublishPage>
    )
}

export default MarkdownPrevew;