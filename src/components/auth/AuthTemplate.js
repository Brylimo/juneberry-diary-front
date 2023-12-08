import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${palette.violet[4]};
`;

const WhiteBox = styled.div`
    .logo-box {
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 3rem;
    }
    border: 1px solid #dbdbdb;
    padding: 2rem;
    width: 40%;
    height: 50%;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const AuthTemplate = ({ children }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-box">
                    <Link to="/">JUNEBERRY DIARY</Link>
                </div>
                { children }
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;