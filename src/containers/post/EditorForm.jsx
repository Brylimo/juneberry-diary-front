import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from '../../modules/publish';
import Editor from '../../components/post/Editor';

const EditorForm = () => {
    const dispatch = useDispatch();
    const { previewActive } = useSelector(({ publish }) => ({
        previewActive: publish.previewActive
    }))

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    return <Editor previewActive={previewActive} />
}

export default EditorForm;