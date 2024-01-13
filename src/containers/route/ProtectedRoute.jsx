import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { signin } from '../../modules/user';
import * as authAPI from '../../lib/api/authAPI';

export const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));

    useEffect(() => {
        if (!user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await authAPI.validate();
                    if (response.status === 403) {
                        navigate("/login");
                    } else if (response.status === 200) {
                        dispatch(signin(response.data));
                    }
                } catch (e) {
                    navigate("/login");
                }
                setLoading(false);
            };

            fetchData();
        }
    }, [user, dispatch, navigate]);

    if (loading) {
        return "로딩중입니다....";
    }

    if (user) {
        return <Outlet />;
    }
};