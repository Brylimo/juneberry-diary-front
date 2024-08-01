import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/common/Header";
import { signout } from '../modules/user';
import { toggleTodoActive } from '../modules/cal';
import { togglePreviewActive, changeField } from '../modules/publish';
import { changePostField } from '../modules/post';
import { useLogoutQuery } from '../hooks/queries/useLogoutQuery';
import { useGetTempPostCntQuery } from '../hooks/queries/useGetTempPostCntQuery';

const HeaderForm = () => {
    const dispatch = useDispatch();
    const { todoActive, previewActive, postUpdateDt, tempCnt } = useSelector(({ cal, publish, post }) => ({
        todoActive: cal.todoActive,
        previewActive: publish.previewActive,
        postUpdateDt: publish.updateDt,
        tempCnt: post.tempCnt
    }));
    const { logoutRefetch } = useLogoutQuery();
    const { data: tempPostCnt } = useGetTempPostCntQuery();

    const onClickLogout = useCallback(e => {
        logoutRefetch().then(() => {
            dispatch(signout());
        });
    }, [logoutRefetch, dispatch]);

    const onClickTodoBtn = useCallback(e => {
        dispatch(toggleTodoActive());
    }, [dispatch]);

    const onClickPreviewBtn = useCallback(e => {
        dispatch(togglePreviewActive());
    }, [dispatch])

    const onClickPostSave = useCallback(() => {
        dispatch(changeField({ key: 'saveActive', value: true}))
    }, [dispatch])

    const onClickPostSubmit = useCallback(() => {
        dispatch(changeField({ key: 'submitActive', value: true}))
    }, [dispatch])

    const onClickTempCnt = useCallback(() => {
        dispatch(changeField({ key: 'tempCntActive', value: true}))
    }, [dispatch])

    useEffect(() => {
        if (tempPostCnt && typeof tempPostCnt === 'number') {
            dispatch(changePostField({key:'tempCnt', value: tempPostCnt}))
        }
    }, [tempPostCnt])

    return <Header 
        todoActive={todoActive} 
        previewActive={previewActive}
        tempCnt={tempCnt}
        postUpdateDt={postUpdateDt}
        onLogout={onClickLogout} 
        onClickTodoBtn={onClickTodoBtn} 
        onClickPreviewBtn={onClickPreviewBtn}
        onClickPostSave={onClickPostSave}
        onClickPostSubmit={onClickPostSubmit} 
        onClickTempCnt={onClickTempCnt}
    />;
}

export default HeaderForm;