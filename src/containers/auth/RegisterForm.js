import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeField, initializeForm, register } from "../../modules/auth";
import { check } from "../../modules/user";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { name, email, username, password, passwordConfirm } = form;
        if ([username, email, password, passwordConfirm].includes('')) {
            alert("빈 칸을 모두 입력하세요.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            changeField({ form: 'register', key: "password", value: '' });
            changeField({ form: 'register', key: "passwordConfirm", value: '' });
            return;
        }
        dispatch(register({ name, email, username, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            if (authError.response.status === 409) {
                alert("이미 존재하는 계정명입니다.");
                return;
            }
            alert("회원가입 실패");
            return;
        }
        if (auth) {
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            navigate('/geo/map');
        }
    }, [navigate, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default RegisterForm;