import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Menu from './Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Switch from '@mui/material/Switch';

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
    ${({ theme }) => theme.sm`
        margin-right: 0.5rem;
    `};
`;

const FlagBottomBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const TitleSpan = styled.span`
    color: green;
    font-size: 3rem;
    margin-left: 2rem;
    font-family: Georgia;

    ${({ theme }) => theme.sm`
        font-size: 2rem;
        margin-left: 1rem;
    `};
    ${({ theme }) => theme.xxs`
        font-size: 1.6rem;
        margin-left: 0.5rem;
    `};
`;

const AvatarBlock = styled.div`
    width: 3.2rem;
    height: 3.2rem;
    background-color: black;
    border-radius: 50%;
    align-self: end;
    cursor: pointer;
    ${({ theme }) => theme.sm`
        width: 2.2rem;
        height: 2.2rem;
    `};
`;

const FlagBottomNav = styled.nav`
    height: 100%;
    margin-left: 2rem;
    ${({ theme }) => theme.sm`
        margin-left: 1rem;
    `};
    ${({ theme }) => theme.xxs`
        margin-left: 0.5rem;
    `};
`;

const FlagBottomUtilityBlock = styled.div`
    margin-right: 1.2rem;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.sm`
        margin-right: 0.2rem;
    `};
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
        props.active &&
        css`
            border-bottom: 0.3rem solid orange;
            color: black;
        `
    }
    ${({ theme }) => theme.xs`
        font-size: 1.2rem;
    `};
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
    ${({ theme }) => theme.xs`
        width: 13rem;
    `};
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
    ${({ theme }) => theme.xs`
        font-weight: 400;
        font-size: 1.3rem;
    `};
`;

const ArrowDropDownIconWrapper = styled(ArrowDropDownIcon)`
    width: 2em;
    height: 2em;
    color: #868e96;
    cursor: pointer;

    ${props =>
        props.active &&
        css`
            color: black;
        `
    }
    ${({ theme }) => theme.sm`
        width: 1em;
        height: 1em;
    `};
`;

const TodoBtnBlock = styled.div`
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
    background-color: #fffff0;
    transition: background-color 0.3 ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 4rem;

    &:hover {
        background-color: #ffffff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:active {
        background-color: #bdc3c7;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
    }
`;

const TodoBtnImg = styled.img`
    width: 60%;
    height: 60%;
    object-fit: cover;
    vertical-align: middle;
`;

const IOSSpan = styled.span`
    font-size: 18px;
    ${({ theme }) => theme.sm`
        font-size: 15px;
    `};
`;

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    margin: '4px',
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: '#e9e9ea',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
    },
  }));

const Header = ({ todoActive, onLogout, onClickTodoBtn }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [view, setView] = useState(false);
    const dropdownElement = useRef(null);

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

    const handleCloseDropdown = useCallback(e => {
        if (view && (dropdownElement.current && !dropdownElement.current.contains(e.target))) setView(false);
    }, [view, dropdownElement]);

    useEffect(() => {
        window.addEventListener('click', handleCloseDropdown);
        return () => {
            window.removeEventListener('click', handleCloseDropdown);
        }
    }, [handleCloseDropdown]);

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
                        <ArrowDropDownIconWrapper onClick={onClickAvatar} active={view}/>
                        {view && <div ref={dropdownElement}>
                            <DropdownBlock>
                                <DropdownMenuBlock>
                                    <DropdownMenu>마이페이지</DropdownMenu>
                                    <DropdownMenu onClick={onLogout}>로그아웃</DropdownMenu>
                                </DropdownMenuBlock>
                            </DropdownBlock>
                        </div>}
                    </FlagTopLeftBlock>
                </FlagTopBlock>
                <FlagBottomBlock>
                    <FlagBottomNav>
                        <FlagBottomUl>
                            <FlagLi active={pathname === "/geo/map"} onClick={onClickMapFlag}>map</FlagLi>
                            <FlagLi active={pathname === "/cal/calendar"} onClick={onClickCalendarFlag}>calendar</FlagLi>
                            <FlagLi active={pathname === "/post/publish"} onClick={onClickPostFlag}>post</FlagLi>
                        </FlagBottomUl>
                    </FlagBottomNav>
                    <FlagBottomUtilityBlock>
                        {pathname === "/cal/calendar" ? 
                        (<>
                            <IOSSpan>Todo</IOSSpan>
                            <IOSSwitch sx={{ m: 1 }} onChange={onClickTodoBtn} checked={todoActive}/>
                        </>) 
                        : ''}
                    </FlagBottomUtilityBlock>
                </FlagBottomBlock>
            </HeaderFlagBlock>
        </HeaderBlock>
    );
}

export default Header;