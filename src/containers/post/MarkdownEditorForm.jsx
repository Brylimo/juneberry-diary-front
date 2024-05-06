import React, { useEffect, useCallback } from 'react';
import MarkdownEditor from '../../components/post/MarkdownEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/publish';

const MarkdownEditorForm = () => {
    const dispatch = useDispatch();
    const { title, mrkdown } = useSelector(({ publish }) => ({
        title: publish.title,
        mrkdown: publish.mrkdown
    }));
    const onChangeField = useCallback(payload => 
        dispatch(changeField(payload)), [dispatch]);

    return <MarkdownEditor 
        onChangeField={onChangeField} 
        title={title}
        mrkdown={mrkdown}
    />
}

export default MarkdownEditorForm;