import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { validate } from '../../lib/api/auth';
import MoonLoader from '../../../node_modules/react-spinners/MoonLoader';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await validate();
                if (response.status === 403) {
                    navigate("/login");
                } else if (response.status === 200) {
                    setData(response.data);
                }
            } catch (e) {
                console.log(e);
                navigate("/login");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <MoonLoader/>;
    }

    if (!data) {
        return null;
    }

    return <Outlet />;
};