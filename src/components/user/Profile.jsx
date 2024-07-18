import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';

const ProfileContent = styled.div`
    position: absolute;
    top: 8rem;
    min-height: calc(100vh - 8rem);
`

const Profile = () => {
    return (
        <ProfileContent>
            <ProfileCard />
        </ProfileContent>
    )
}

export default Profile;