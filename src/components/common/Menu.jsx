import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export default Menu;