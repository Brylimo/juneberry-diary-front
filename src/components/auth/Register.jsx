import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSendCodeMutation } from '../../hooks/mutations/email/useSendCodeMutation';
import { useVerifyCodeMutation } from '../../hooks/mutations/user/useVerifyCodeMutation';
import { useRegisterMutation } from '../../hooks/mutations/user/useRegisterMutation';
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
    position: relative;
    left: -38px;
    margin-bottom: 25px;
`

const StepHeaderContent = styled.div`
    display: flex;
    flex-direction: column;
`

const StepSpan = styled.span`
    margin-bottom: 5px;
    font-weight: 600;
    color: #dbd4d4;
`

const PasswordNotiBlock = styled.div`
    font-size: 15px;
    color: #fff;
    margin-top: 10px;
    font-weight: 400;
`

const PasswordNotiUl = styled.ul`
    margin-top: 10px;
`

const PasswordNotiLi = styled.li`
    margin-bottom: 10px;
`

const KeyboardArrowLeftIconCustom = styled(KeyboardArrowLeftIcon)`
    height: 38px;
    width: 38px;
    cursor: pointer;
    color: #7c7c7c;

    &:hover {
        color: #fff;
    }
`

const Register = ({ type, form, onChange, onSubmit }) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();

    const [ initialSubmit, setInitialSubmit ] = useState(false);
    const [ initialNextSubmit, setInitialNextSubmit ] = useState(false);
    const [ firstSubmit, setFirstSubmit ] = useState(false);
    const [ secondSubmit, setSecondSubmit ] = useState(false);

    const [ initialNext, setInitialNext ] = useState(false);
    const [ firstStep, setFirstStep ] = useState(false);
    const [ secondStep, setSecondStep ] = useState(false);
    
    const [ initialStates, setInitialStates ]  = useState({
        email: ''
    })
    const [ initialNextStates, setInitialNextStates ] = useState({
        code: ''
    })
    const [ firstStates, setFirstStates ] = useState({
        password: ''
    })
    const [ secondStates, setSecondStates ] = useState({
        name: '',
        username: ''
    })

    const { mutate: sendCodeMutate } = useSendCodeMutation()
    const { mutate: verifyCodeMutate } = useVerifyCodeMutation()
    const { mutate: registerMutate } = useRegisterMutation()

    const onClickFirstGoBack = useCallback(() => {
        navigate(`${location.pathname}`)
    }, [navigate, location])

    const onClickSecondGoBack = useCallback(() => {
        navigate(`${location.pathname}#step=1`)
    }, [navigate, location])

    const onSubmitAuthRequest = useCallback(() => {
        setInitialSubmit(true)
    }, [])

    const onSubmitAuthVerify = useCallback(() => {
        setInitialNextSubmit(true)
    }, [])

    const onSubmitPassword = useCallback(() => {
        setFirstSubmit(true)
    }, [])

    const onSubmitInfo = useCallback(() => {
        setSecondSubmit(true)
    }, [])

    // custom submit success function
    const emailSubmitSuccessCallback = (inputTxt) => {
        setInitialStates(prev => ({...prev, email: inputTxt}))
    }

    const verificationCodeSubmitSuccessCallback = (inputTxt) => {
        setInitialNextStates(prev => ({...prev, code: inputTxt}))
    }

    const passwordSubmitSuccessCallback = (inputTxt) => {
        setFirstStates(prev => ({...prev, password: inputTxt}))
    }

    const nameSubmitSuccessCallback = (inputTxt) => {
        setSecondStates(prev => ({...prev, name: inputTxt}))
    }

    const usernameSubmitSuccessCallback = (inputTxt) => {
        setSecondStates(prev => ({...prev, username: inputTxt}))
    }

    // custom submit failed function
    const emailSubmitFailedCallback = () => {
        setInitialSubmit(false)
    }

    const passwordSubmitFailedCallback = () => {
        setFirstSubmit(false)
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

    const PasswordValidate = (password) => {
        // 조건 1: 문자 (영어 알파벳) 1개 이상
        const hasLetter = /[a-zA-Z]/.test(password);
        // 조건 2: 숫자 또는 특수 문자 1개 이상
        const hasNumberOrSpecialChar = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
        // 조건 3: 10자 이상
        const isAtLeast10Chars = password.length >= 10;

        if (hasLetter && hasNumberOrSpecialChar && isAtLeast10Chars) {
            return ""
        } else {
            return "비밀번호 생성 조건을 만족하지 않습니다."
        }
    }

    const NameValidate = (name) => {
        if (name.length > 30) {
            return "30자 이내로 입력해주세요."
        } else {
            return ""
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
                    setFirstStep(true)
                } else {
                    navigate(`${location.pathname}`)
                }
            } else if (step == 2) {
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
                Object.values(firstStates).forEach(state => { // initialNextStates 존재 여부 확인
                    if (!state) {
                        isOkay = false
                    }
                });

                if (isOkay) {
                    setSecondStep(true)
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

    useEffect(() => { // first step submit monitoring
        if (firstStates && firstSubmit) { // 현재 제출을 한 상태
            let isOkay = true;
            Object.values(firstStates).forEach(state => {
                if (!state) {
                    isOkay = false
                }
            });

            setFirstSubmit(false)
            setFirstStep(false)

            if (isOkay) { // success
                navigate(`${location.pathname}#step=2`)
            } else {
                alert("비밀번호 생성 조건을 만족하지 않습니다.")
            }
        }
    }, [firstStates])

    useEffect(() => { // second step submit monitoring
        if (secondStates && secondSubmit) { // 현재 제출을 한 상태
            let isOkay = true;
            Object.values(secondStates).forEach(state => {
                if (!state) {
                    isOkay = false
                }
            });

            setSecondSubmit(false)

            if (isOkay) { // success
                registerMutate(
                    {
                        name: secondStates.name,
                        email: initialStates.email,
                        username: secondStates.username,
                        password: firstStates.password
                    },
                    {
                        onError: (error) => {
                            if (error.response.status === 409) {
                                alert("이미 존재하는 계정명입니다.");
                                return;
                            }
                            alert("회원가입 실패");
                            return;
                        },
                        onSuccess: () => {
                            alert("가입이 완료되었습니다!");
                            navigate("/login");
                        }
                    }
                )
            }
        }
    }, [secondStates, registerMutate, navigate])

    return (
        <RegisterTemplateBlock>
            <RegisterWrapper>
                <LogoBlock>
                    <Logo>
                        <img src="/logo.svg" style={{width:'40px', height:'40px'}} alt="logo" />
                    </Logo>
                </LogoBlock>
                {(!firstStep && !secondStep) && 
                (<TextBlock>
                    가입하고<br/>
                    나만의 기록을<br/> 
                    공유하세요
                </TextBlock>)}
                
                {(!firstStep && !secondStep) &&
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
                        <KeyboardArrowLeftIconCustom onClick={onClickFirstGoBack} />
                        <StepHeaderContent>
                            <StepSpan>1/2 단계</StepSpan>
                            <span>비밀번호를 만드세요.</span>
                        </StepHeaderContent>
                    </StepHeader>
                    <RegisterBlock>
                        <RegisterInput
                            purpose="password" 
                            validate={PasswordValidate}
                            isSubmit={firstSubmit}
                            submitSuccess={passwordSubmitSuccessCallback}
                            submitFailed={passwordSubmitFailedCallback}
                            inputLabel="비밀번호" 
                            name="password" 
                            required
                        />
                        <PasswordNotiBlock>
                            비밀번호에는 다음 문자가 반드시 포함되어야 합니다.
                            <PasswordNotiUl>
                                <PasswordNotiLi>◦ 문자 1개</PasswordNotiLi>
                                <PasswordNotiLi>◦ 숫자 또는 특수 문자 1개</PasswordNotiLi>
                                <PasswordNotiLi>◦ 10자 이상</PasswordNotiLi>
                            </PasswordNotiUl>
                        </PasswordNotiBlock>

                        <Button cyan fullWidth style={{ marginTop: "20px" }} onClick={onSubmitPassword}>다음</Button>
                    </RegisterBlock>
                </>)}
                {secondStep && 
                (<>
                    <StepHeader>
                        <KeyboardArrowLeftIconCustom onClick={onClickSecondGoBack} />
                        <StepHeaderContent>
                            <StepSpan>2/2 단계</StepSpan>
                            <span>자신을 소개해주세요.</span>
                        </StepHeaderContent>
                    </StepHeader>
                    <RegisterBlock>
                        <RegisterInput 
                            validate={NameValidate}
                            isSubmit={secondSubmit}
                            submitSuccess={nameSubmitSuccessCallback}
                            submitFailed={null}
                            inputLabel="이름" 
                            subText="실제 이름을 입력해주세요."
                            name="name" 
                            required
                        />
                        <RegisterInput 
                            validate={NameValidate}
                            isSubmit={secondSubmit}
                            submitSuccess={usernameSubmitSuccessCallback}
                            submitFailed={null}
                            inputLabel="사용자 이름" 
                            subText="이 이름이 프로필에 표시됩니다."
                            name="username" 
                            required
                        />

                        <Button cyan fullWidth style={{ marginTop: "20px" }} onClick={onSubmitInfo}>가입하기</Button>
                    </RegisterBlock>
                </>)}
            </RegisterWrapper>
        </RegisterTemplateBlock>
    )
}

export default Register;