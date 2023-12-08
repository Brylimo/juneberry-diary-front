import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const AuthFormBlock = styled.div`
    flex: 1;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    form {
        display: flex;
        flex-direction: column;
        width: 80%;
        gap: 3rem;
    }
`;

const StyledInput = styled.input`
    font-size: 2rem;
    padding: 1rem;
    outline: none;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    &:focus {
        border-bottom: 1px solid ${palette.violet[8]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const AuthForm = () => {
    return (
        <AuthFormBlock>
            <form>
                <StyledInput name="username" placeholder='아이디' />
                <StyledInput type="password" name="password" placeholder='비밀번호' />
                <Button>login</Button>
            </form>
        </AuthFormBlock>
    )
}

export default AuthForm;