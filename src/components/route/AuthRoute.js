import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { validate } from '../../lib/api/auth';

export const AuthRoute = () => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await validate();
                if (response.status === 403) {
                    setFlag(true);
                } else if (response.status === 200) {
                    navigate("/geo/map");
                }
            } catch (e) {
                console.log(e);
                navigate("/geo/map");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (flag) {
        return <Outlet />;
    }
};