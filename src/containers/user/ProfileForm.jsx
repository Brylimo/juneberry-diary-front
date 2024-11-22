import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../../components/user/Profile';

const ProfileForm = () => {
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }));

    return <Profile user={user}/>;
}

export default ProfileForm;