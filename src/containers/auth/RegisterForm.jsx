import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeField, initializeForm } from "../../modules/auth";
import Register from "../../components/auth/Register";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../hooks/mutations/user/useRegisterMutation";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate: registerMutate } = useRegisterMutation();

    const { form } = useSelector(({ auth }) => ({
        form: auth.register
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
        registerMutate(
            {name, email, username, password},
            {
                onError: (error) => {
                    dispatch(initializeForm('register'));
                    if (error.response.status === 409) {
                        alert("이미 존재하는 계정명입니다.");
                        return;
                    }
                    alert("회원가입 실패");
                    return;
                },
                onSuccess: () => {
                    alert("가입이 완료되었습니다!");
                    navigate("/login");
                }
            }
        )
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    return (
        <Register
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default RegisterForm;