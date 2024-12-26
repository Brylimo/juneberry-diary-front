import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Menu from './Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';

const HeaderBlock = styled.div`
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
    border-bottom: 0.3rem solid transparent;
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

const ModalBlock = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #8c959f33;
    z-index: 19983004;
    overflow: hidden;
`

const DropdownBlock = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
`;

const DropdownMenuBlock = styled.div`
    position: relative;
    z-index: 32;
    width: 320px;
    height: 100%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
    padding: 1rem 1.2rem;
    ${({ theme }) => theme.xs`
        width: 311px;
    `};
`;

const DropdownInfo = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    justify-content: space-between;
    align-items: center;
`;

const DropdownLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #d0d7deb3;
    margin-top: 4px;
    margin-bottom: 5px;
`;

const DropdownInfoLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
`;

const DropdownInfoName = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #000000eb;
`;

const DropdownMenu = styled.div`
    padding: 6px 8px;
    line-height: 1.5;
    font-weight: 500;
    font-size: 14px;
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

const IOSSpan = styled.span`
    font-size: 18px;
    ${({ theme }) => theme.sm`
        font-size: 15px;
    `};
`;

const IOSSwitch = styled(({bgColor, ...props}) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme, bgColor }) => ({
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
          backgroundColor: bgColor,
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

const PublishUtilityBlock = styled.div`
    display: flex;
    gap: 4px;
    height: 100%;
    align-items: center;
    margin-left: 2rem;
    ${({ theme }) => theme.sm`
        margin-left: 1rem;
    `};
    ${({ theme }) => theme.xxs`
        margin-left: 0.5rem;
    `};
`;

const CommonBtn = styled.button`
    flex: 1;
    height: 65%;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    padding: 3px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    letter-spacing: 1px;
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
    padding: 0 6px;
    ${props => props.bgColor &&
        css`
            background-color: ${props.bgColor};
        `
    }

    &:hover {
        ${props => props.hoverColor &&
            css`
                background-color: ${props.hoverColor};
            `
        }
    }
`;

const SaveBtnBlock = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65%;
    border: none;
    outline: none;
    background-color: #f6f6f7;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    letter-spacing: 1px;
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
`;

const SaveBtn = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
    letter-spacing: 1px;
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
    background-color: transparent;
    height: 100%;
    border-radius: 4px;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const SaveBtnLine = styled.div`
    width: 1px;
    height: 100%;
    background-color: #d0d7de;
`;

const CloseIconCustom = styled(CloseIcon)`
    width: 16px;
    height: 16px; 
    opacity: 0.5;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
`

const LoginBtn = styled.button`
    padding: 1.5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    height: 30px;
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border: none;
    color: white;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.8);

    &:hover {
            background-color: rgba(0, 0, 0, 1);
    }
`

const BlogNameSpan = styled.span`
    color: #565c62;
    line-height: 4rem;
    font-size: 26px;
    font-weight: bold;
    font-family: slowslow;
    letter-spacing: 3px;
`;

const Header = ({ 
    paramId,
    user,
    blogName,
    todoActive, 
    submitActive, 
    tempCnt,
    postUpdateDt,
    onLogout, 
    onClickTodoBtn, 
    onClickPostSave, 
    onClickPostSubmit,
    onClickPostGoBack,
    onClickTempCnt 
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [view, setView] = useState(false);
    const dropdownElement = useRef(null);

    const onClickMyPage = useCallback(e => {
        setView(false);
        navigate('/user/profile');
    }, [navigate])

    const onClickMapFlag = useCallback(e => {
        setView(false);
        navigate('/geo/map');
    }, [navigate]);

    const onClickCalendarFlag = useCallback(e => {
        setView(false);
        navigate('/cal/calendar');
    }, [navigate]);

    const onClickDiaryFlag = useCallback(e => {
        setView(false);
        navigate('/diary/main');
    }, [navigate]);

    const onClickSettingFlag = useCallback(e => {
        setView(false);
        navigate('/setting');
    }, [navigate]);

    const onClickBlogFlag = useCallback(e => {
        setView(false);
        navigate(`/blogs/repositories`);
    }, [navigate]);

    const onClickBlogStart = useCallback(e => {
        setView(false)
        navigate('/blogs/join');
    }, [navigate])

    const onClickLoginBtn = useCallback(e => {
        navigate('/login')
    }, [navigate])

    const onClickNewBlog = useCallback(e => {
        navigate('/blogs/join')
    }, [navigate])

    const onClickBlogPublish = useCallback(e => {
        // 동적으로 param 값을 삽입해줌
        if (paramId) {
            navigate(`/blog/${paramId}/publish`)
        }
    }, [navigate, paramId])

    const onClickAvatar = useCallback(e => {
        e.stopPropagation();
        setView(!view);
    }, [view]);

    const onClickCloseIcon = useCallback(e => {
        setView(false)
    }, [])

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
                <Menu to='/'><img src="/logo.svg" style={{width:'6rem', height:'6rem'}} alt="logo"></img></Menu>
            </Logo>
            <HeaderFlagBlock>
                <FlagTopBlock>
                    <TitleSpan>JUNEBERRY DIARY</TitleSpan>
                    <FlagTopLeftBlock>
                        {user ? (
                            <>
                                <AvatarBlock onClick={onClickAvatar}></AvatarBlock>
                                {view && (<ModalBlock>
                                    <DropdownBlock ref={dropdownElement}>
                                        <DropdownMenuBlock>
                                            <DropdownInfo>
                                                <DropdownInfoLeft>
                                                    <AvatarBlock />
                                                    <DropdownInfoName>{user?.username}</DropdownInfoName>
                                                </DropdownInfoLeft>
                                                <CloseIconCustom onClick={onClickCloseIcon} />
                                            </DropdownInfo>
                                            <DropdownMenu onClick={onClickMyPage}>마이페이지</DropdownMenu>
                                            <DropdownLine />
                                            <DropdownMenu onClick={onClickMapFlag}>지도</DropdownMenu>
                                            <DropdownMenu onClick={onClickCalendarFlag}>캘린더</DropdownMenu>
                                            { /* <DropdownMenu onClick={onClickDiaryFlag}>다이어리</DropdownMenu> */ }
                                            { user.hasBlog ? (<DropdownMenu onClick={onClickBlogFlag}>내 블로그</DropdownMenu>) : (<DropdownMenu onClick={onClickBlogStart}>블로그 시작하기</DropdownMenu>) }
                                            <DropdownLine />
                                            <DropdownMenu onClick={onClickSettingFlag}>설정</DropdownMenu>
                                            <DropdownMenu onClick={onLogout}>로그아웃</DropdownMenu>
                                        </DropdownMenuBlock>
                                    </DropdownBlock>
                                </ModalBlock>)}
                            </>
                        ) : (<LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>)}
                    </FlagTopLeftBlock>
                </FlagTopBlock>
                <FlagBottomBlock>
                    {/^\/blog\/[^/]+\/publish$/.test(pathname) && !submitActive && 
                        (<PublishUtilityBlock>
                            <SaveBtnBlock>
                                <SaveBtn onClick={onClickPostSave}>save</SaveBtn>
                                <SaveBtnLine/>
                                <SaveBtn onClick={onClickTempCnt}>{tempCnt}</SaveBtn>
                            </SaveBtnBlock>
                            <CommonBtn onClick={onClickPostSubmit} bgColor={"#8df198"} hoverColor={"#7ac884"}>publish</CommonBtn>
                        </PublishUtilityBlock>)
                    }
                    {/^\/blog\/[^/]+\/publish$/.test(pathname) && submitActive && 
                        (<PublishUtilityBlock>
                            <CommonBtn onClick={onClickPostGoBack} bgColor={"#f6f6f7"} hoverColor={"#e0e0e0"}>goback</CommonBtn>
                        </PublishUtilityBlock>)
                    }
                    {(pathname.startsWith("/blog") && !(/^\/blog\/[^/]+\/publish$/.test(pathname)) &&!pathname.startsWith("/blogs")) && 
                        (<PublishUtilityBlock>
                            <BlogNameSpan>{blogName}</BlogNameSpan>
                        </PublishUtilityBlock>)
                    }
                    {!(/^\/blog\/[^/]+\/publish$/.test(pathname)) && !(pathname.startsWith("/blog") && !pathname.startsWith("/blogs")) &&
                        (<FlagBottomNav>
                            <FlagBottomUl>
                                <FlagLi active={pathname === "/geo/map"} onClick={onClickMapFlag}>map</FlagLi>
                                <FlagLi active={pathname === "/cal/calendar"} onClick={onClickCalendarFlag}>calendar</FlagLi>
                                {/* <FlagLi active={pathname === "/diary/main"} onClick={onClickDiaryFlag}>diary</FlagLi> */}
                                { user.hasBlog && (<FlagLi active={pathname === "/blogs/repositories"} onClick={onClickBlogFlag}>blogs</FlagLi>) }
                            </FlagBottomUl>
                        </FlagBottomNav>)
                    }
                    <FlagBottomUtilityBlock>
                        {pathname === "/cal/calendar" &&
                        (<>
                            <IOSSpan>Todo</IOSSpan>
                            <IOSSwitch sx={{ m: 1 }} bgColor={"#65C466"} onChange={onClickTodoBtn} checked={todoActive}/>
                        </>)}
                        {/^\/blog\/[^/]+\/publish$/.test(pathname) && !submitActive && postUpdateDt &&
                        (<>
                            <IOSSpan>임시저장: {postUpdateDt.getHours()}시 {postUpdateDt.getMinutes()}분</IOSSpan>
                        </>)}
                        {pathname === "/blogs/repositories" &&
                        (<>
                            <CommonBtn onClick={onClickNewBlog} bgColor={"#f6f6f7"} hoverColor={"#e0e0e0"}>새 블로그</CommonBtn>
                        </>)}
                        {user && (pathname.startsWith("/blog") && !(/^\/blog\/[^/]+\/publish$/.test(pathname)) && !pathname.startsWith("/blogs")) &&
                        (<>
                            <CommonBtn onClick={onClickBlogPublish} bgColor={"#f6f6f7"} hoverColor={"#e0e0e0"}>새 글 작성</CommonBtn>
                        </>)}
                    </FlagBottomUtilityBlock>
                </FlagBottomBlock>
            </HeaderFlagBlock>
        </HeaderBlock>
    );
}

export default Header;