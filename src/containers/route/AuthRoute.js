import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { signin } from '../../modules/user';
import * as authAPI from '../../lib/api/authAPI';

export const AuthRoute = () => {
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
        setReady(true);
    }, [error, setReady])

    if (isPending) return "로딩중입니다....";

    if (ready) {
        if (!user) {
            return <Outlet />;
        } else  {
            navigate("/cal/calendar");
        }        
    }
};