import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/common/Header";
import { signout } from '../modules/user';
import { toggleTodoActive } from '../modules/cal';
import { togglePreviewActive, changeField } from '../modules/publish';
import { useLogoutQuery } from '../hooks/queries/useLogoutQuery';

const HeaderForm = () => {
    const dispatch = useDispatch();
    const { todoActive, previewActive } = useSelector(({ cal, publish }) => ({
        todoActive: cal.todoActive,
        previewActive: publish.previewActive
    }));
    const { logoutRefetch } = useLogoutQuery();

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

    return <Header 
        todoActive={todoActive} 
        previewActive={previewActive} 
        onLogout={onClickLogout} 
        onClickTodoBtn={onClickTodoBtn} 
        onClickPreviewBtn={onClickPreviewBtn}
        onClickPostSave={onClickPostSave}
        onClickPostSubmit={onClickPostSubmit} 
    />;
}

export default HeaderForm;