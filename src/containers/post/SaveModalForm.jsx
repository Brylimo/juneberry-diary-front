import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SaveModal from '../../components/post/SaveModal';

const SaveModalForm = ({activeState, setActiveState}) => {
    const dispatch = useDispatch();
    const { tempCnt } = useSelector(({ post }) => ({
        tempCnt: post.tempCnt
    }))

    return <SaveModal
        tempCnt={tempCnt}
        activeState={activeState} 
        setActiveState={setActiveState}
    />
}

export default SaveModalForm;