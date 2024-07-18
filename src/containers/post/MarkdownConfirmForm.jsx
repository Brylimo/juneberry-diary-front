import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MarkdownConfirm from '../../components/post/MarkdownConfirm';

function replaceEmptyLinesWithBr(text) {
    const lines = text.split('\n');

    const processedLines = lines.map((line, index) => {
        const isBlankLine = line.trim() === '';
        return isBlankLine ? '\u200B' : line;
    });
    const processedText = processedLines.join('\n');

    return processedText;
}

const MarkdownConfirmForm = () => {
    const dispatch = useDispatch();
    const { title, mrkdown } = useSelector(({ publish }) => ({
        title: publish.title,
        mrkdown: publish.mrkdown
    }));

    return <MarkdownConfirm title={title} mrkdown={replaceEmptyLinesWithBr(mrkdown)} />
}

export default MarkdownConfirmForm;