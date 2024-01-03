import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom";
import { validate } from '../../lib/api/auth';
import { signin } from '../../modules/user';

export const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await validate();
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