import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    gap: 30px;
    background: ${palette.violet[4]};
    font-size: 1.5rem;
    align-items: center;
`;

const LogoCell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LogoBox = styled.div`
    display: flex;
    flex: 1;
    justify-content: right;

    @media (max-width: 850px) {
        display:none;
    }

    ${props =>
        props.type === "register" &&
        css`
            display: none;
        `
    }
`;

const LogoImg = styled.img`
    width: 40rem;
    height: 40rem;
`;

const LogoSlogan = styled.div`
    color: white;
    position: relative;
    top: -5.5rem;
    font-size: 27px;
    font-weight: 400;
    border-radius: 50%;   
`;

const AuthBox = styled.div`
    flex: 1;
    display: flex;

    @media (max-width: 850px) {
        justify-content: center;    
    }

    ${props =>
        props.type === "register" &&
        css`
        justify-content: center;  
        `
    }
`

const WhiteBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 350px;
    gap: 1rem;
    flex: 1;
`;

const WhiteBox = styled.div`
    .logo-box {
        text-align: center;
        font-weight: bold;
        font-size: 2.7rem;
        margin-bottom: 1rem;
        font-family: Georgia;
    }
    border: 1px solid #dbdbdb;
    padding: 2rem;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SmallWhiteBox = styled.div`
    padding: 2rem;
    border: 1px solid #dbdbdb;
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
            <LogoBox type={type}>
                <LogoCell>
                    <LogoImg src="/logo.svg"></LogoImg>
                    <LogoSlogan>Make your day with happy choices :)</LogoSlogan>
                </LogoCell>
            </LogoBox>
            <AuthBox type={type}>
                <WhiteBoxWrapper>
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
                </WhiteBoxWrapper>
            </AuthBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;