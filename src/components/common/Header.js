import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled, { css } from 'styled-components';
import Menu from './Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { signout } from './../../modules/user';
import * as authAPI from '../../lib/api/authAPI';

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

const FlagTopLeftBlock = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2rem;
    position: relative;
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
    width: 3.2rem;
    height: 3.2rem;
    background-color: black;
    border-radius: 50%;
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

const DropdownBlock = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 1rem;
`;

const DropdownMenuBlock = styled.div`
    position: relative;
    z-index: 32;
    width: 20rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
`;

const DropdownMenu = styled.div`
    padding: 1rem 1.2rem;
    line-height: 1.5;
    font-weight: 500;
    font-size: 1.6rem;
    cursor: pointer;

    &:hover {
        background-color: #F8F9FA;
        color: red;
    }
`;

const ArrowDropDownIconWrapper = styled(ArrowDropDownIcon)`
    width: 2em;
    height: 2em;
    color: #868e96;
    cursor: pointer;

    ${props =>
        props.isActive &&
        css`
            color: black;
        `
    }
`;

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isLogout, setIsLogout] = useState(false);
    const [view, setView] = useState(false);
    const dropdownElement = useRef(null);

    const { data } = useQuery({
        queryKey: ["logout"],
        queryFn: authAPI.logout,
        enabled: isLogout,
        cacheTime: 0,
        staleTime: 0
    });

    const onClickMapFlag = useCallback(e => {
        navigate('/geo/map');
    }, [navigate]);

    const onClickCalendarFlag = useCallback(e => {
        navigate('/cal/calendar');
    }, [navigate]);

    const onClickPostFlag = useCallback(e => {
        navigate('/post/publish');
    }, [navigate]);

    const onClickAvatar = useCallback(e => {
        e.stopPropagation();
        setView(!view);
    }, [view]);

    const onClickLogout = useCallback(e => {
        setIsLogout(true);
    }, [setIsLogout]);

    const handleCloseDropdown = useCallback(e => {
        if (view && (dropdownElement.current && !dropdownElement.current.contains(e.target))) setView(false);
    }, [view, dropdownElement]);

    useEffect(() => {
        window.addEventListener('click', handleCloseDropdown);
        return () => {
            window.removeEventListener('click', handleCloseDropdown);
        }
    }, [handleCloseDropdown]);

    useEffect(() => {
        if (isLogout && data) {
            queryClient.invalidateQueries();
            dispatch(signout())
        }
    }, [data, dispatch, queryClient, isLogout])

    return (
        <HeaderBlock>
            <Logo>
                <Menu to='/'><img src="/logo.svg" style={{width:'6rem', height:'6rem'}}></img></Menu>
            </Logo>
            <HeaderFlagBlock>
                <FlagTopBlock>
                    <TitleSpan>JUNEBERRY DIARY</TitleSpan>
                    <FlagTopLeftBlock>
                        <AvatarBlock onClick={onClickAvatar}></AvatarBlock>
                        <ArrowDropDownIconWrapper onClick={onClickAvatar} isActive={view}/>
                        {view && <div ref={dropdownElement}>
                            <DropdownBlock>
                                <DropdownMenuBlock>
                                    <DropdownMenu>마이페이지</DropdownMenu>
                                    <DropdownMenu onClick={onClickLogout}>로그아웃</DropdownMenu>
                                </DropdownMenuBlock>
                            </DropdownBlock>
                        </div>}
                    </FlagTopLeftBlock>
                </FlagTopBlock>
                <FlagBottomBlock>
                    <FlagBottomNav>
                        <FlagBottomUl>
                            <FlagLi isActive={pathname === "/geo/map"} onClick={onClickMapFlag}>map</FlagLi>
                            <FlagLi isActive={pathname === "/cal/calendar"} onClick={onClickCalendarFlag}>calendar</FlagLi>
                            <FlagLi isActive={pathname === "/post/publish"} onClick={onClickPostFlag}>post</FlagLi>
                        </FlagBottomUl>
                    </FlagBottomNav>
                </FlagBottomBlock>
            </HeaderFlagBlock>
        </HeaderBlock>
    );
}

export default Header;