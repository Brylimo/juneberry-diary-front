import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MarkdownPrevew from '../../components/post/MarkdownPreview';

function replaceEmptyLinesWithBr(text) {
    const lines = text.split('\n');

    const processedLines = lines.map((line, index) => {
        const isBlankLine = line.trim() === '';
        return isBlankLine ? '\u200B' : line;
    });
    const processedText = processedLines.join('\n');

    return processedText;
}

const MarkdownPreviewForm = () => {
    const dispatch = useDispatch();
    const { title, mrkdown } = useSelector(({ publish }) => ({
        title: publish.title,
        mrkdown: publish.mrkdown
    }));

    return <MarkdownPrevew title={title} mrkdown={replaceEmptyLinesWithBr(mrkdown)} />
}

export default MarkdownPreviewForm;