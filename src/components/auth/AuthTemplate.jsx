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
    gap: 1rem;
    font-size: 1.5rem;
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
    min-height: 50%;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SmallWhiteBox = styled.div`
    padding: 2rem;
    border: 1px solid #dbdbdb;
    width: 40%;
    background: white;
    border-radius: 5px;
    text-align: center;
`;

const StyledLink = styled(Link)`
    color: ${palette.blue[5]};
`

const AuthTemplate = ({ type, children }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-box">
                    <Link to="/">JUNEBERRY DIARY</Link>
                </div>
                { children }
            </WhiteBox>
            <SmallWhiteBox>
                {type === 'login' && (
                    <>
                        <span>계정이 없으신가요?</span>
                        <StyledLink to="/register">가입하기</StyledLink>
                    </>
                )}
                {type === 'register' && (
                    <>
                        <span>계정이 있으신가요?</span>
                        <StyledLink to="/login">로그인</StyledLink>
                    </>
                )}
            </SmallWhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;