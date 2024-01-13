import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';


const RegisterPage = () => {
    return (
        <AuthTemplate type="register">
            <RegisterForm />
        </AuthTemplate>
    );
};

export default RegisterPage;