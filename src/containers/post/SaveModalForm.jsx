import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storePost } from '../../modules/publish';
import SaveModal from '../../components/post/SaveModal';

const SaveModalForm = ({activeState, setActiveState}) => {
    const dispatch = useDispatch();
    const { tempCnt } = useSelector(({ post }) => ({
        tempCnt: post.tempCnt
    }))

    const onClickTempCard = useCallback((item) => {
        dispatch(storePost({
            id: item.id,
            title: item.title,
            mrkdown: item.content,
            isTemp: item.isTemp
        }))
        setActiveState(false);
    }, [setActiveState, dispatch]);

    return <SaveModal
        tempCnt={tempCnt} 
        setActiveState={setActiveState}
        onClickTempCard={onClickTempCard}
    />
}

export default SaveModalForm;