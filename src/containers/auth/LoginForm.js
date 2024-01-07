import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as authAPI from '../../lib/api/authAPI';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: authAPI.login,
        onError: () => {
            console.log('오류 발생');
            dispatch(initializeForm('login'));
            return;
        },
        onSuccess: () => {
            navigate('/geo/map');
        }
    })

    const { form } = useSelector(({ auth }) => ({
        form: auth.login
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
        loginMutation.mutate({username, password});
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

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