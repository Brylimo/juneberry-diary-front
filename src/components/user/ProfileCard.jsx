import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const ProfileCardBlock = styled.div`
    width: 100%;
    border-radius: 1rem;
    border: 1px solid #d0d7de;
    height: 60rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`

const ProfileCardImgBlock = styled.div`
    position: relative;
    width: 100%;
    background-color: black;
    border-radius: 50%;

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

const ProfileCardInfoBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
`;

const PCInfoUserName = styled.div`
    font-weight: bold;
    font-size: 35px;
`;

const ProfileCard = () => {

    return (
        <ProfileCardBlock>
            <ProfileCardImgBlock>
            </ProfileCardImgBlock>
            <ProfileCardInfoBlock>
                <PCInfoUserName>
                    brylimo
                </PCInfoUserName>
            </ProfileCardInfoBlock>
        </ProfileCardBlock>
    )
}

export default ProfileCard;