import React, { useEffect, useCallback } from 'react';
import MarkdownEditor from '../../components/post/MarkdownEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/publish';

const MarkdownEditorForm = () => {
    const dispatch = useDispatch();
    const { title, mrkdown } = useSelector(({ publish }) => ({
        title: publish.title,
        markdown: publish.markdown
    }));
    const onChangeField = useCallback(payload => 
        dispatch(changeField(payload)), [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    return <MarkdownEditor 
        onChangeField={onChangeField} 
        title={title}
        mrkdown={mrkdown}
    />
}

export default MarkdownEditorForm;