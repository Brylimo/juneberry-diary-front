import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>회원가입</title>
            </Helmet>
            <AuthTemplate type="register">
                <RegisterForm />
            </AuthTemplate>
        </>
    );
};

export default RegisterPage;