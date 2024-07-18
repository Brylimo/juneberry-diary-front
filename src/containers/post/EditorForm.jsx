import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from '../../modules/publish';
import Editor from '../../components/post/Editor';

const EditorForm = () => {
    const dispatch = useDispatch();
    const { submitActive } = useSelector(({ publish }) => ({
        submitActive: publish.submitActive
    }))

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    return <Editor submitActive={submitActive} />
}

export default EditorForm;