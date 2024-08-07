import React from 'react';
import styled, { css } from 'styled-components';
import Menu from '../common/Menu';
import MapIcon from '@mui/icons-material/Map';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const StyledSideBar = styled.aside`
    position: fixed;
    top: 8rem;
    z-index: 10;
    width: 7rem;
    background-color: white;
    height: calc(100% - 8rem); 
    box-shadow: inset calc(max(1px, 0.0625rem)*-1) 0 #d0d7de;
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
            height: 8rem;
            border-bottom: 0.08rem solid gray;
        `
    }
`;

const MenuSpan = styled.span`
    color: green;
`;

const SideBar = () => {
    return (
        <StyledSideBar>
            <ul style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                    <MenuLi>
                        <Menu to='/'>
                            <MapIcon style={{width:'4rem', height:'4rem' }} />
                            <MenuSpan>HOME</MenuSpan>
                        </Menu>
                    </MenuLi>
                    <MenuLi>
                        <Menu to='/cal/calendar'>
                            <AddLocationAltIcon style={{width:'4rem', height:'4rem' }} />
                            <MenuSpan>ADD</MenuSpan>
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
            </ul>
        </StyledSideBar>
    );
}

export default SideBar;