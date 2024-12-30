import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeField, initializeForm } from "../../modules/auth";
import Login from "../../components/auth/Login";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../hooks/mutations/auth/useLoginMutation";
import { signin } from '../../modules/user';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate: loginMutate } = useLoginMutation();
    
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

        loginMutate(
            {username, password},
            {
                onError: () => {
                    console.log('오류 발생');
                    alert('로그인에 실패했습니다.');
                    dispatch(initializeForm('login'));
                    return;
                },
                onSuccess: (res) => {
                    dispatch(signin(res.data))
                    navigate('/cal/calendar');
                }
            }
        );
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    return (
        <Login
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default LoginForm;