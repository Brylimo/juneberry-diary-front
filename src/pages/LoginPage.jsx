import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>로그인</title>
            </Helmet>
            <AuthTemplate type="login" >
                <LoginForm type="login" />
            </AuthTemplate>
        </>
    );
};

export default LoginPage;