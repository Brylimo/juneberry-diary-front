import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeField, initializeAuth, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import client from "../../lib/api/client";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('오류 발생');
            return;
        }
        if (auth) {
            dispatch(initializeAuth());
            navigate('/geo/map');
        }
    }, [auth, authError, dispatch, navigate]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default LoginForm;