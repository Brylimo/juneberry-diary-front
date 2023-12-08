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

const textMap = {
    login: '로그인',
    register: '회원가입'
}

const AuthForm = ({ type, form, onChange, onSubmit }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <form onSubmit={onSubmit}>
                {type === 'register' && (
                    <>
                        <StyledInput 
                            name="name" 
                            placeholder='성명' 
                            onChange={onChange}
                            value={form.name}
                            required 
                        />
                        <StyledInput 
                            name="username" 
                            placeholder='사용자 이름'
                            onChange={onChange}
                            value={form.username} 
                            required 
                        />
                    </>
                )}
                <StyledInput 
                    name="id" 
                    placeholder='아이디'
                    onChange={onChange}
                    value={form.id} 
                    required 
                />
                <StyledInput 
                    type="password" 
                    name="password" 
                    placeholder='비밀번호'
                    onChange={onChange}
                    value={form.password}
                    required 
                />
                {type === 'register' && (
                    <StyledInput 
                        type="password" 
                        name="passwordConfirm" 
                        placeholder='비밀번호 확인'
                        onChange={onChange}
                        value={form.passwordConfirm} 
                        required 
                    />
                )}
                <Button cyan fullWidth>{ text }</Button>
            </form>
        </AuthFormBlock>
    )
}

export default AuthForm;