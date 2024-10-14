import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from "../components/common/Header";
import { signout } from '../modules/user';
import { toggleTodoActive } from '../modules/cal';
import { changeField } from '../modules/publish';
import { useLogoutQuery } from '../hooks/queries/auth/useLogoutQuery';
import { toast } from 'react-toastify';

const HeaderForm = () => {
    const { id: paramId } = useParams();
    const dispatch = useDispatch();
    const { user, blogName, todoActive, submitActive, postTitle, postMrkdown, postUpdateDt, tempCnt } = useSelector(({ cal, publish, user, blog }) => ({
        user: user.user,
        blogName: blog.blogName,
        todoActive: cal.todoActive,
        submitActive: publish.submitActive,
        postTitle: publish.title,
        postMrkdown: publish.mrkdown,
        postUpdateDt: publish.updateDt,
        tempCnt: blog.tempCnt
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

    const onClickPostSave = useCallback(() => {
        dispatch(changeField({ key: 'saveActive', value: true}))
    }, [dispatch])

    const onClickPostSubmit = useCallback(() => {
        if (postTitle && postMrkdown) {
            dispatch(changeField({ key: 'submitActive', value: true}))
        } else {
            toast.error("제목 또는 내용이 비어있습니다.");
        }
    }, [postTitle, postMrkdown, dispatch])

    const onClickPostGoBack = useCallback(() => {
        dispatch(changeField({ key: 'submitActive', value: false}))
    }, [dispatch])

    const onClickTempCnt = useCallback(() => {
        dispatch(changeField({ key: 'tempCntActive', value: true}))
    }, [dispatch])

    return <Header 
        paramId={paramId}
        user={user}
        blogName={blogName}
        todoActive={todoActive} 
        submitActive={submitActive}
        tempCnt={tempCnt}
        postUpdateDt={postUpdateDt}
        onLogout={onClickLogout} 
        onClickTodoBtn={onClickTodoBtn} 
        onClickPostSave={onClickPostSave}
        onClickPostSubmit={onClickPostSubmit}
        onClickPostGoBack={onClickPostGoBack} 
        onClickTempCnt={onClickTempCnt}
    />;
}

export default HeaderForm;