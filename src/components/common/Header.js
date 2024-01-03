import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import Menu from './Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    top: 0;
    z-index: 320;
    height: 8rem;
    width: 100%;
    background-color: white;
    box-shadow: inset 0 calc(max(1px, 0.0625rem)*-1) #d0d7de;
    display: flex;
`;

const Logo = styled.div`
    width: 7rem;
    border-right: 1px solid #d0d7de;
    position: relative;
    text-align: center;
    height: 100%;
`;

const HeaderFlagBlock = styled.div`
    display: flex;
    flex-direction: column;
    heigth: 100%;
    flex: 1;
`;

const FlagTopBlock = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FlagBottomBlock = styled.div`
    flex: 1;
`;

const TitleSpan = styled.span`
    color: green;
    font-size: 3rem;
    margin-left: 2rem;
    font-family: Georgia;
`;

const AvatarBlock = styled.div`
    width: 3.7rem;
    height: 3.7rem;
    background-color: black;
    border-radius: 50%;
    margin-right: 2rem;
    align-self: end;
    cursor: pointer;
`;

const FlagBottomNav = styled.nav`
    height: 100%;
    margin-left: 2rem;
`;

const FlagBottomUl = styled.ul`
    height: inherit;
    display: flex;
    gap: 1rem;
    font-size: 1.8rem;
`;

const FlagLi = styled.li`
    height: inherit;
    line-height: 4rem;
    cursor: pointer;
    color: #868e96;
    ${props =>
        props.isActive &&
        css`
            border-bottom: 0.3rem solid orange;
            color: black;
        `
    }
`;

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onMapClick = useCallback(e => {
        navigate('/geo/map');
    }, [navigate]);

    const onCalendarClick = useCallback(e => {
        navigate('/cal/calendar');
    }, [navigate]);

    const onPostClick = useCallback(e => {
        navigate('/post/publish');
    }, [navigate]);

    return (
        <HeaderBlock>
            <Logo>
                <Menu to='/'><img src="/logo.svg" style={{width:'6rem', height:'6rem'}}></img></Menu>
            </Logo>
            <HeaderFlagBlock>
                <FlagTopBlock>
                    <TitleSpan>JUNEBERRY DIARY</TitleSpan>
                    <AvatarBlock></AvatarBlock>
                </FlagTopBlock>
                <FlagBottomBlock>
                    <FlagBottomNav>
                        <FlagBottomUl>
                            <FlagLi isActive={pathname === "/geo/map"} onClick={onMapClick}>map</FlagLi>
                            <FlagLi isActive={pathname === "/cal/calendar"} onClick={onCalendarClick}>calendar</FlagLi>
                            <FlagLi isActive={pathname === "/post/publish"} onClick={onPostClick}>post</FlagLi>
                        </FlagBottomUl>
                    </FlagBottomNav>
                </FlagBottomBlock>
            </HeaderFlagBlock>
        </HeaderBlock>
    );
}

export default Header;