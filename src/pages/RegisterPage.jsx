import React from 'react';
import RegisterForm from '../containers/auth/RegisterForm';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>회원가입</title>
            </Helmet>
            <RegisterForm />
        </>
    );
};

export default RegisterPage;