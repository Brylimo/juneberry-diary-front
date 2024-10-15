import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { storePost } from '../../modules/publish';
import { changeBlogField } from '../../modules/blog';
import SaveModal from '../../components/post/SaveModal';

const SaveModalForm = ({setActiveState}) => {
    const { id: blogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tempCnt, tempPosts } = useSelector(({ blog }) => ({
        tempCnt: blog.tempCnt,
        tempPosts: blog.tempPosts
    }))

    const onClickTempCard = useCallback((item) => {
        navigate(`/blog/${blogId}/publish?id=${item.id}`, { replace: true })
        
        dispatch(storePost({
            id: item.id,
            title: item.title,
            description: item.description,
            mrkdown: item.content,
            updateDt: null,
            isTemp: item.isTemp
        }))
        setActiveState(false);
    }, [setActiveState, dispatch, navigate]);

    const onChangeField = useCallback(payload =>
        dispatch(changeBlogField(payload)), [dispatch]);

    return <SaveModal
        tempCnt={tempCnt} 
        tempPosts={tempPosts}
        setActiveState={setActiveState}
        onClickTempCard={onClickTempCard}
        onChangeField={onChangeField}
    />
}

export default SaveModalForm;