import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MarkdownPrevew from '../../components/post/MarkdownPreview';

const MarkdownPreviewForm = () => {
    const dispatch = useDispatch();
    const { title, mrkdown } = useSelector(({ publish }) => ({
        title: publish.title,
        mrkdown: publish.mrkdown
    }));

    return <MarkdownPrevew title={title} mrkdown={mrkdown} />
}

export default MarkdownPreviewForm;