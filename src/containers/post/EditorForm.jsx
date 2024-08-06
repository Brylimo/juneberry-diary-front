import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from '../../modules/publish';
import { storePost } from '../../modules/publish';
import { useGetTempPostQuery } from '../../hooks/queries/useGetTempPostQuery';
import { useSearchParams } from 'react-router-dom';
import Editor from '../../components/post/Editor';

const EditorForm = () => {
    const dispatch = useDispatch();
    const { submitActive } = useSelector(({ publish }) => ({
        submitActive: publish.submitActive
    }))
    const [searchParams, setSearchParams] = useSearchParams();
    const [apiEnabled, setApiEnabled] = useState(false);
    const { data: tempPost } = useGetTempPostQuery(searchParams.get("id"), apiEnabled)

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    useEffect(() => {
        if (tempPost && !Array.isArray(tempPost)) { 
            dispatch(storePost({
                id: tempPost.id,
                title: tempPost.title,
                descriptoin: tempPost.descriptoin,
                mrkdown: tempPost.content,
                updateDt: null,
                isTemp: tempPost.isTemp,
                isPublic: tempPost.isPublic
            }))
        }
    }, [tempPost, dispatch])

    useEffect(()=> {
        if (Array.from(searchParams.keys()).length > 0 && searchParams.get("id")) {
            setApiEnabled(true)
        }
    }, [searchParams])

    return <Editor tempPost={tempPost} submitActive={submitActive} />
}

export default EditorForm;