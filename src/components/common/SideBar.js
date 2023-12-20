import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StyledSideBar = styled.aside`
    position: fixed;
    top: 0;
    z-index: 320;
    width: 7rem;
    background-color: white;
    height: 100%; 
`;

const StyledMenuWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.5rem;

    &:hover {
        color: green;
    }
`;

const MenuLi = styled.li`
    position: relative;
    transition: 0.2s;
    height: 8rem;
    font-size: 1.4rem;
    color: black;
    text-align: center;

    ${props =>
        props.logo &&
        css`
            height: 9rem;
            border-bottom: 0.08rem solid gray;
        `
    }
`;

const MenuLink = styled(Link)`
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
`;

const Menu = ({ children, to }) => {
    return (
        <MenuLink to={to}>
            <StyledMenuWrapper>
                {children}
            </StyledMenuWrapper>
        </MenuLink>
    );
}

const MenuSpan = styled.span`
    color: green;
`;

const SideBar = () => {
    return (
        <StyledSideBar>
            <ul style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                    <MenuLi logo>
                        <Menu to='/'><img src="/logo.svg" style={{width:'6rem', height:'6rem'}}></img></Menu>
                    </MenuLi>
                    <MenuLi>
                        <Menu to='/'>
                            <AddLocationAltIcon style={{width:'4rem', height:'4rem' }} />
                            <MenuSpan>REGISTER</MenuSpan>
                        </Menu>
                    </MenuLi>
                    <MenuLi>
                        <Menu to='/'>
                            <FormatListBulletedIcon style={{width:'4rem', height:'4rem'}} />
                            <MenuSpan>LIST</MenuSpan>
                        </Menu>
                    </MenuLi>
                    <MenuLi>
                        <Menu to='/'>
                            <DirectionsBusIcon style={{width:'4rem', height:'4rem'}} />
                            <MenuSpan>BUS</MenuSpan>
                        </Menu>
                    </MenuLi>
                </div>
                <MenuLi>
                    <Menu to='/login'>
                        <KeyboardBackspaceIcon style={{width:'4rem', height:'4rem'}}/>
                    </Menu>
                </MenuLi>
            </ul>
        </StyledSideBar>
    );
}

export default SideBar;