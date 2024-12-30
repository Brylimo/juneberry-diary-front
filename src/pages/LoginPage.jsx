import React from 'react';
import LoginTemplate from '../components/auth/LoginTemplate';
import LoginForm from '../containers/auth/LoginForm';
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>로그인</title>
            </Helmet>
            <LoginTemplate type="login" >
                <LoginForm type="login" />
            </LoginTemplate>
        </>
    );
};

export default LoginPage;