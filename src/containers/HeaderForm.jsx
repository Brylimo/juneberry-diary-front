import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/common/Header";
import { signout } from '../modules/user';
import { toggleTodoActive } from '../modules/cal';
import { useLogoutQuery } from '../hooks/queries/useLogoutQuery';

const HeaderForm = () => {
    const dispatch = useDispatch();
    const { todoActive } = useSelector(({ cal }) => ({
        todoActive: cal.todoActive
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

    return <Header todoActive={todoActive} onLogout={onClickLogout} onClickTodoBtn={onClickTodoBtn} />;
}

export default HeaderForm;