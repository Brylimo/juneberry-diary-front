import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { signin } from '../../modules/user';
import * as authAPI from '../../lib/api/authAPI';

export const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ready, setReady] = useState(false);

    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));

    const { isPending, data: res, error } = useQuery({
        queryKey: ["validate"],
        queryFn: authAPI.validate,
        enabled: !user,
        retry: 0
    });

    useEffect(() => {
        if (res) {
            dispatch(signin(res.data));
            setReady(true);
        }

        if (user) {
            setReady(true);
        }
    }, [res, user, dispatch, setReady])

    useEffect(() => {
        if (error) {
            navigate("/login");
        }
    }, [error, navigate])

    if (isPending) return "로딩중입니다....";

    if (ready) {
        if (user) return <Outlet />;        
    }

    /*const [loading, setLoading] = useState(false);

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
    }*/
};