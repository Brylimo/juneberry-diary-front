import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/post/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/publish';

const EditorForm = () => {
    const dispatch = useDispatch();
    const { title, body } = useSelector(({ publish }) => ({
        title: publish.title,
        body: publish.body
    }));
    const onChangeField = useCallback(payload => 
        dispatch(changeField(payload)), [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    return <Editor 
        onChangeField={onChangeField} 
        title={title}
        body={body}
    />
}

export default EditorForm;