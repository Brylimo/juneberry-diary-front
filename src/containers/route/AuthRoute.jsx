import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom";
import { signin } from '../../modules/user';
import * as tokenAPI from '../../lib/api/tokenAPI';

export const AuthRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));

    useEffect(() => {
        if (!user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await tokenAPI.validate();
                    if (response.status === 200) {
                        dispatch(signin(response.data?.data));
                    }
                } catch (e) {}
                setLoading(false);
            };
            fetchData();
        }
        setReady(true);
    }, [user, dispatch, navigate]);

    if (loading) {
        //return "로딩중입니다....";
        return null;
    } else if (ready) {
        if (!user) {
            return <Outlet />;
        } else {
            navigate("/cal/calendar");
        }
        setReady(false);
    }
};