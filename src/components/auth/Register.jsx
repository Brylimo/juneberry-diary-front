import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSendCodeMutation } from '../../hooks/mutations/email/useSendCodeMutation';
import { useVerifyCodeMutation } from '../../hooks/mutations/user/useVerifyCodeMutation';
import * as userAPI from "../../lib/api/userAPI";
import Button from '../common/Button';
import RegisterInput from '../common/RegisterInput';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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

const StepHeader = styled.div`
    font-size: 16px;
    color: white;
    display: flex;
`

const StepHeaderContent = styled.div`
    display: flex;
    flex-direction: column;
`

const KeyboardArrowLeftIconCustom = styled(KeyboardArrowLeftIcon)`
    height: 100%;
`

const Register = ({ type, form, onChange, onSubmit }) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();

    const [ initialSubmit, setInitialSubmit ] = useState(false);
    const [ initialNextSubmit, setInitialNextSubmit ] = useState(false);
    const [ firstSubmit, setFirstSubmit ] = useState(false);

    const [ initialNext, setInitialNext ] = useState(false);
    const [ firstStep, setFirstStep ] = useState(false);
    const [ initialStates, setInitialStates ]  = useState({
        email: ''
    })
    const [ initialNextStates, setInitialNextStates ] = useState({
        code: ''
    })

    const { mutate: sendCodeMutate } = useSendCodeMutation()
    const { mutate: verifyCodeMutate } = useVerifyCodeMutation()

    const onSubmitAuthRequest = useCallback(() => {
        setInitialSubmit(true)
    }, [])

    const onSubmitAuthVerify = useCallback(() => {
        setInitialNextSubmit(true)
    }, [])

    // custom submit success function
    const emailSubmitSuccessCallback = (inputTxt) => {
        setInitialStates(prev => ({...prev, email: inputTxt}))
    }

    const verificationCodeSubmitSuccessCallback = (inputTxt) => {
        setInitialNextStates(prev => ({...prev, code: inputTxt}))
    }

    // custom submit failed function
    const emailSubmitFailedCallback = () => {
        setInitialSubmit(false)
    }

    // custom timer failed function
    const codeTimerFailedCallback = () => {
        setInitialNext(false)
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

    useEffect(() => {
        if (location.hash && location.hash.startsWith("#step=")) {
            const step = location.hash.match(/#step=(\d+)/)?.[1] || null;
            
            if (step == 1) {
                let isOkay = true;
                Object.values(initialStates).forEach(state => { // initialStates 존재 여부 확인
                    if (!state) {
                        isOkay = false
                    }
                });
                Object.values(initialNextStates).forEach(state => { // initialNextStates 존재 여부 확인
                    if (!state) {
                        isOkay = false
                    }
                });

                if (isOkay) {
                    setFirstStep(1)
                } else {
                    navigate(`${location.pathname}`)
                }
            }
        }
    }, [location, navigate])

    useEffect(() => { // initial step submit monitoring
        if (initialStates && initialSubmit) { // 현재 제출을 한 상태
            let isOkay = true;
            Object.values(initialStates).forEach(state => {
                if (!state) {
                    isOkay = false
                }
            });

            setInitialSubmit(false)

            if (isOkay) {
                // send code via email
                sendCodeMutate(
                    {
                        email: initialStates.email
                    },
                    {
                        onSuccess: () => {
                            // 코드 발송
                        },
                        onError: (error) => {

                        }
                    }
                )

                setInitialNext(true)
            }
        }
    }, [initialStates, sendCodeMutate])

    useEffect(() => { // initial next step submit monitoring
        if (initialNextStates && initialNextSubmit) {
            let isOkay = true;
            Object.values(initialNextStates).forEach(state => {
                if (!state) {
                    isOkay = false
                }
            });

            setInitialNextSubmit(false)

            if (isOkay) {
                // verify code via email
                verifyCodeMutate(
                    {
                        email: initialStates.email,
                        code: initialNextStates.code
                    },
                    {
                        onSuccess: (res) => {
                            navigate(`${location.pathname}#step=1`)
                        },
                        onError: (error) => {
                            if (error.response?.status === 400) {
                                alert("인증코드가 틀렸습니다."); // 400 상태 코드 처리
                              } else {
                                console.error(error);
                                alert("알 수 없는 오류가 발생했습니다."); // 기타 오류 처리
                              }
                        }
                    }
                )
            }
        }
    }, [initialNextStates, initialStates, verifyCodeMutate])

    return (
        <RegisterTemplateBlock>
            <RegisterWrapper>
                <LogoBlock>
                    <Logo>
                        <img src="/logo.svg" style={{width:'40px', height:'40px'}} alt="logo" />
                    </Logo>
                </LogoBlock>
                {!firstStep && 
                (<TextBlock>
                    가입하고<br/>
                    나만의 기록을<br/> 
                    공유하세요
                </TextBlock>)}
                
                {!firstStep && 
                (<RegisterBlock>
                    <RegisterInput
                        purpose="email" 
                        validate={emailValidate}
                        isSubmit={initialSubmit}
                        submitSuccess={emailSubmitSuccessCallback}
                        submitFailed={emailSubmitFailedCallback}
                        inputLabel="이메일 주소" 
                        name="email" 
                        placeholder="name@domain.com"
                        required
                    />
                    {initialNext && (
                        <RegisterInput 
                            purpose="code"
                            inputLabel="인증코드" 
                            name="verify-code" 
                            isSubmit={initialNextSubmit}
                            timerFailed={codeTimerFailedCallback}
                            submitSuccess={verificationCodeSubmitSuccessCallback}
                            required
                        />
                    )}

                    {!initialNext ? (
                        <Button cyan fullWidth style={{ marginTop: "20px" }} onClick={onSubmitAuthRequest}>인증요청</Button>
                    ) : (
                        <Button cyan fullWidth style={{ marginTop: "20px" }} onClick={onSubmitAuthVerify}>다음</Button>
                    )}
                    
                </RegisterBlock>)}
                {firstStep && 
                (<>
                    <StepHeader>
                        <KeyboardArrowLeftIconCustom />
                        <StepHeaderContent>
                            <span>1/2 단계</span>
                            <span>비밀번호를 만드세요.</span>
                        </StepHeaderContent>
                    </StepHeader>
                    <RegisterBlock>
                        <RegisterInput
                            purpose="password" 
                            validate={null}
                            isSubmit={firstSubmit}
                            submitSuccess={null}
                            submitFailed={null}
                            inputLabel="비밀번호" 
                            name="password" 
                            required
                        />
                    </RegisterBlock>
                </>)}
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