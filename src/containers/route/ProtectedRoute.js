import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../modules/user";
import { useNavigate, Outlet } from "react-router-dom";
import { LoginPage } from '../../pages';

export const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, validateError } = useSelector(({ user }) => ({
        user: user.user,
        validateError: user.validateError
    }));

    useEffect(() => {
        dispatch(validate());
    }, [dispatch]);

    useEffect(() => { 
        if (validateError) {
            alert(validateError);
            navigate("/login");
        }
    }, [validateError, navigate]);

    return (
        <>
            {user ? <Outlet /> : "로딩중...."}
        </>
    );
};