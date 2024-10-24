import React, {useState} from 'react';
import styled from 'styled-components';
import prismThemes from '../../lib/styles/prismThemes';
import { unified } from 'unified';
import endEffectPlugin from '../../lib/remark/endEffectPlugin';
import prismPlugin from '../../lib/remark/prismPlugin';
import remarkParse from 'remark-parse';
import slug from 'rehype-slug';
import remarkRehype from "remark-rehype";
import remarkBreak from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import sanitize from "sanitize-html";
import { defaultSchema } from "hast-util-sanitize";
import Typography from '../common/Typography';

const MarkdownRendererBlock = styled.div`
    &.default {
        ${prismThemes['default']}
    }

    font-size: 16px;
    font-family: monospace;
    word-break: normal;
    word-wrap: break-word;

    pre {
        background-color: #fbfcfd;
        padding: 20px 10px;
    }

    & menu, ol, ul {
        list-style: disc;
        list-style-position: inside;
    }

    & ul ul {
        margin-left: 20px;
    }

    a {
        color: #54a0ff;
        text-decoration: underline;
    }

    table {
        width: 100%;
        margin-bottom: 1rem;
        font-size: 14px;

        & thead th {
            text-align: center;
            padding: 5px 5px;
            background-color: #f68e2c;
            color: #fff;
            border: 0.5px solid #ddd;
        }

        & tr td {
            padding: 5px 5px;
            border: 0.5px solid #ddd;
        }
    }

    blockquote {
        border-left: 3px solid lightgray;
        padding-left: 10px;
        margin: 0 0 0 15px;
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
    console.log('sun', html)
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

const sanitizeSchema = JSON.parse(JSON.stringify(defaultSchema));

// className 속성을 허용하도록 스키마를 수정 -> code
sanitizeSchema.attributes = sanitizeSchema.attributes || {};
sanitizeSchema.attributes["*"] = [...(sanitizeSchema.attributes["*"] || []), "className"];

const MarkdownRenderer = ({
    markdown,
    codeTheme = 'default'
}) => {
    const [htmlTxt, setHtmlTxt] = useState(
        filter(
          unified()
            .use(remarkParse)
            .use(remarkBreak)
            .use(remarkGfm)
            .use(prismPlugin)
            .use(endEffectPlugin)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(slug)
            .use(rehypeSanitize, sanitizeSchema)
            .use(rehypeStringify)
            .processSync(replaceEmptyLinesWithBr(markdown))
            .toString()
        )
    );

    return (
        <Typography>
            <MarkdownRendererBlock 
                className={codeTheme} 
                dangerouslySetInnerHTML={{ __html: htmlTxt }}
            />
        </Typography>
    )
}

export default MarkdownRenderer;