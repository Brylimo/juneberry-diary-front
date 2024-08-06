import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storePost } from '../../modules/publish';
import SaveModal from '../../components/post/SaveModal';

const SaveModalForm = ({setActiveState}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tempCnt } = useSelector(({ post }) => ({
        tempCnt: post.tempCnt
    }))

    const onClickTempCard = useCallback((item) => {
        navigate(`/post/publish?id=${item.id}`, { replace: true })
        
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

    return <SaveModal
        tempCnt={tempCnt} 
        setActiveState={setActiveState}
        onClickTempCard={onClickTempCard}
    />
}

export default SaveModalForm;