import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';

const ProfileBlock = styled.div`
    position: absolute;
    top: 8rem;
    min-height: calc(100vh - 8rem);
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const ProfileLeftSidebar = styled.div`
    width: 280px;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-left: 2rem;
    margin-right: 2rem;
`;

const ProfileContent = styled.div`
    flex: 6;
`

const Profile = () => {
    return (
        <ProfileBlock>
            <ProfileLeftSidebar>
                <ProfileCard />
            </ProfileLeftSidebar>
            <ProfileContent>
            </ProfileContent>
        </ProfileBlock>
    )
}

export default Profile;