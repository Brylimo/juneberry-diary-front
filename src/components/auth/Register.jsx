import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSendCodeMutation } from '../../hooks/mutations/email/useSendCodeMutation';
import * as userAPI from "../../lib/api/userAPI";
import Button from '../common/Button';
import RegisterInput from '../common/RegisterInput';

const RegisterTemplateBlock = styled.div`
    padding: 32px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(18, 18, 18);
    height: 100vh;

    ${({ theme }) => theme.sm`
            padding-left: 0;
            padding-right: 0;
    `};
`

const RegisterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 324px;
    min-width: 200px;
    height: 100%;
`

const LogoBlock = styled.div`
    display: flex;
    justify-content: center;
    height: 55px;
    margin-top: 10px;
    margin-bottom: 32px;
`

const Logo = styled.div`
    width: 55px;
    border: 1px solid rgb(233, 236, 239);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fff;

    &:hover {
        background-color: rgb(248, 249, 250);
    }
`

const TextBlock = styled.div`
    font-size: 48px;
    text-align: center;
    line-height: 1.35;
    font-weight: 600;
    margin-bottom: 24px;
    color: #fff;

    ${({ theme }) => theme.sm`
        font-size: 42px;
    `};
`

const RegisterBlock = styled.div`
    flex: 1;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
`;

const Register = ({ type, form, onChange, onSubmit }) => {
    const queryClient = useQueryClient();
    const location = useLocation();

    const [ firstSubmit, setFirstSubmit ] = useState(false);
    const [ firstNext, setFirstNext ] = useState(false);
    const [ firstStates, setFirstStates ]  = useState({
        email: false
    })

    const { mutate: sendCodeMutate } = useSendCodeMutation()

    const onClickLogo = useCallback(() => {
        window.open('/', '_blank');
    }, [])

    const onSubmitAuthRequest = useCallback(() => {
        setFirstSubmit(true)
    }, [])

    // custom submit success function
    const emailSubmitSuccessCallback = () => {
        setFirstStates(prev => ({...prev, email: true}))
    }

    // custom submit failed function
    const emailSubmitFailedCallback = () => {
        setFirstSubmit(false)
    }

    // custom validate function
    const emailValidate = async (email) => { // 이메일 검증 커스텀 콜백
        try {
            const data = await queryClient.fetchQuery({
                queryKey: ["getUserByEmail", { email }],
                queryFn: async () => {
                    try {
                        const response = await userAPI.getUserByEmail({ email });
    
                        // 상태 코드와 데이터를 반환
                        if (response?.state) {
                            return {
                                status: response.state,
                                data: response.data
                            };
                        } else {
                            throw new Error("No status in response");
                        }
                    } catch (error) {
                        return { status: error.response?.status || 500, data: null };
                    }
                },
                retry: 0
            });

            if (200 <= data.status && data.status < 300) { // 반환 성공
                return "이메일이 이미 존재합니다."
            } else if (data.status === 404) { // not found
                return ""
            } else {
                return "오류가 발생하였습니다. 관리자에게 문의해주세요."
            }
        } catch (error) {
            return '오류가 발생하였습니다. 관리자에게 문의해주세요.';
        }
    }

    useEffect(() => { // first step submit monitoring
        if (firstStates && firstSubmit) { // 현재 제출을 한 상태
            let isOkay = true;
            Object.values(firstStates).forEach(state => {
                if (!state) {
                    isOkay = false
                }
            });

            setFirstSubmit(false)

            if (isOkay) {
                // send code via email
                sendCodeMutate(
                    {
                        email: "icj0103@gmail.com"
                    },
                    {
                        onSuccess: () => {
                            alert("hihi")
                        },
                        onError: (error) => {

                        }
                    }
                )

                setFirstNext(true)
            }
        }
    }, [firstStates, sendCodeMutate])

    console.log(location.hash)

    return (
        <RegisterTemplateBlock>
            <RegisterWrapper>
                <LogoBlock>
                    <Logo onClick={onClickLogo}>
                        <img src="/logo.svg" style={{width:'40px', height:'40px'}} alt="logo" />
                    </Logo>
                </LogoBlock>
                <TextBlock>
                    가입하고<br/>
                    나만의 기록을<br/> 
                    공유하세요
                </TextBlock>
                <RegisterBlock>
                    <RegisterInput
                        purpose="email" 
                        validate={emailValidate}
                        isSubmit={firstSubmit}
                        submitSuccess={emailSubmitSuccessCallback}
                        submitFailed={emailSubmitFailedCallback}
                        inputLabel="이메일 주소" 
                        name="email" 
                        placeholder="name@domain.com"
                        required
                    />
                    {firstNext && (
                        <RegisterInput 
                            inputLabel="인증코드" 
                            name="verify-code" 
                            required
                        />
                    )}

                    {!firstNext ? (
                        <Button cyan fullWidth style={{ marginTop: "20px" }} onClick={onSubmitAuthRequest}>인증요청</Button>
                    ) : (
                        <Button cyan fullWidth style={{ marginTop: "20px" }}>다음</Button>
                    )}
                    
                </RegisterBlock>
                {/*<RegisterBlock>
                    <form onSubmit={onSubmit}>
                        <StyledInput 
                            name="name" 
                            placeholder='성명' 
                            onChange={onChange}
                            value={form.name}
                            required 
                        />
                        <StyledInput 
                            name="email" 
                            placeholder='이메일'
                            onChange={onChange}
                            value={form.email} 
                            required 
                        />
                        <StyledInput 
                            name="username" 
                            placeholder='사용자 이름'
                            onChange={onChange}
                            value={form.username} 
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
                        <StyledInput 
                            type="password" 
                            name="passwordConfirm" 
                            placeholder='비밀번호 확인'
                            onChange={onChange}
                            value={form.passwordConfirm} 
                            required 
                        />
                        <Button cyan fullWidth>가입하기</Button>
                    </form>
                </RegisterBlock>*/}
            </RegisterWrapper>
        </RegisterTemplateBlock>
    )
}

export default Register;