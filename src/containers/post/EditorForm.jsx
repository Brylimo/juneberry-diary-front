import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../../components/post/Editor';

const EditorForm = () => {
    const { previewActive } = useSelector(({ publish }) => ({
        previewActive: publish.previewActive
    }))
    return <Editor previewActive={previewActive} />
}

export default EditorForm;