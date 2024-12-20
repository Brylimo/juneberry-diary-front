import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize, storePost } from '../../modules/publish';
import { useGetPostQuery } from '../../hooks/queries/post/useGetPostQuery';
import { useSearchParams } from 'react-router-dom';
import Editor from '../../components/post/Editor';

const EditorForm = () => {
    const dispatch = useDispatch();
    const { submitActive } = useSelector(({ publish }) => ({
        submitActive: publish.submitActive
    }))
    const [searchParams, setSearchParams] = useSearchParams();
    const [apiEnabled, setApiEnabled] = useState(false);
    const { data: tempPost } = useGetPostQuery(searchParams.get("id"), apiEnabled)

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])

    useEffect(() => {
        if (tempPost && !Array.isArray(tempPost)) { 
            dispatch(storePost({
                id: tempPost.id,
                category: tempPost.category,
                subCategory: tempPost.subCategory,
                title: tempPost.title,
                description: tempPost.description,
                mrkdown: tempPost.content,
                postTags: tempPost.tags,
                updateDt: null,
                isTemp: tempPost.isTemp,
                isPublic: tempPost.isPublic,
                thumbnailPath: tempPost.thumbnailPath
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