import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Header from "../components/common/Header";
import { signout } from '../modules/user';
import { useLogoutQuery } from '../hooks/queries/useLogoutQuery';

const HeaderForm = () => {
    const dispatch = useDispatch();
    const { logoutRefetch } = useLogoutQuery();

    const onClickLogout = useCallback(e => {
        logoutRefetch().then(() => {
            dispatch(signout());
        });
    }, [logoutRefetch, dispatch]);

    return <Header onLogout={onClickLogout} />;
}

export default HeaderForm;