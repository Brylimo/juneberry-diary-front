import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
    border: none;
    border-radius: 0.4rem;
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }
    
    ${
        props =>
        props.fullWidth &&
        css`
            width: 100%;
        `
    }
`;

const Button = props => <StyledButton {...props} />;

export default Button;