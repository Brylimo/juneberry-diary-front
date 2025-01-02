import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RegisterInputBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`

const StyledInputLabel = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: white;
    letter-spacing: 1px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const SubText = styled.div`
    color: white;
    font-size: 14px;
    margin-top: 5px;
`

const TimerSpan = styled.span`
    color: #ed2c3f;
`

const StyledInputBlock = styled.div`
    margin-top: 8px;
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px #7c7c7c;
    display: flex;
    align-items: center;

    ${props => props.isError &&
        css`
            box-shadow: inset 0 0 0 1.5px #ed2c3f;
        `
    }

    ${props => props.isFocus &&
        css`
            box-shadow: inset 0 0 0 1.5px #fff;
        `
    }
`

const StyledInput = styled.input`
    font-size: 1.6rem;
    background: transparent;
    color: white;
    padding: 1rem 0 1rem 1rem;
    padding-block-start: 8px;
    outline: none;
    border-radius: 8px;
    border: none;
    flex: 1;

    & + & {
        margin-top: 1rem;
    }
`;

const ErrorTip = styled.div`
    margin-top: 8px;
    font-size: 13px;
    color: #f3727f;
`

const StyledIcon = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const VisibilityOffIconCustom = styled(VisibilityOffIcon)`
    color: white;
    cursor: pointer;
`

const VisibilityIconCustom = styled(VisibilityIcon)`
    color: white;
    cursor: pointer;
`

const RegisterInput = ({ inputLabel = "", subText, state, purpose, validate, isSubmit, submitSuccess, submitFailed, timerFailed, ...inputProps }) => {
    const [ inputTxt, setInputTxt ] = useState(state || '')
    const [ isFocus, setIsFocus ] = useState(false)
    const [ hidePassword, setHidePassword ] = useState(true)
    const [ error, setError ] = useState('')

    const [ min, setMin ] = useState(5)
    const [ sec, setSec ] = useState(0)
    const time = useRef(300) // defualt : 초 단위로 5분
    const timerId = useRef(null)
    
    // RegisterInput 전처리 (value, onChange, onBlur 제거)
    if ('value' in inputProps) {
        delete inputProps.value;
    }

    if ('onChange' in inputProps) {
        delete inputProps.onChange;
    }

    if ('onBlur' in inputProps) {
        delete inputProps.onBlur;
    }

    const startTimer = () => {
        // 5분 타이머 시작
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60))
            setSec(time.current % 60)
            time.current -= 1;
        }, 1000)
    }

    const onInputChange = useCallback(e => {
        setInputTxt(e.target.value)
    }, [])

    const onClickVisibilityOffIcon = useCallback(e => {
        setHidePassword(false)
    }, [])

    const onClickVisibilityIcon = useCallback(e => {
        setHidePassword(true)
    }, [])

    const handleBlur = useCallback(() => { // 검증 작업
        // required 처리
        if (!inputTxt && inputProps.required) {
            setError(`${inputLabel}는 필수 정보입니다.`)
            return
        }

        if (inputProps.min && inputProps.max) { // 최소, 최대값이 존재
            setError(`${inputProps.min}~${inputProps.max}자로 입력해 주세요.`)
            return
        } else if (inputProps.min) {
            setError(`${inputProps.min}자 이상으로 입력해 주세요.`)
            return
        } else if (inputProps.max) {
            setError(`${inputProps.max}자 이하로 입력해 주세요.`)
            return
        }

        // 사용 목적에 따라 검증
        if (purpose && typeof purpose === "string") {
            if (purpose === "email") {
                const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){0,30}@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){0,30}\.[a-zA-Z]{2,3}$/;
            
                if (!emailRegExp.test(inputTxt)) {
                    setError("이메일 형식에 맞지 않습니다.")
                    return
                }
            }
        }

        // custom validate 함수 조건 확인
        if (validate) {
            const res = validate(inputTxt) // validate 함수는 에러 메시지 반환

            if (res instanceof Promise) {
                res.then(result => {
                    if (typeof result === "string" && result.length > 0) {
                        setError(result); // 에러 메시지 설정
                        return
                    }
                }).catch((err) => {
                    console.error("custom validation error");
                    return
                });
            } else if (typeof res === "string" && res.length > 0) {
                setError(res);
                return
            }
        }

        // validate 조건 만족
        setError('')

    }, [inputLabel, inputTxt, validate, purpose, inputProps])

    const handleFocus = useCallback(() => {
        if (error) {
            setError('')
        }
    }, [error])

    useEffect(() => {
        if (purpose === "code") { // 인증코드인 경우
            // 타이머 시작
            startTimer()

            return () => clearInterval(timerId.current)
        }
    }, [purpose])

    useEffect(() => {
        if (time.current <= 0) { // time over
            clearInterval(timerId.current)

            if (timerFailed && typeof timerFailed === "function") { // 타이머 실패시 처리
                timerFailed()
            }
        }
    }, [sec, timerFailed])

    useEffect(() => {
        if (isSubmit) { // submit 되었으면 -> 전체 유효성 검사 다시
            if (!inputTxt && inputProps.required) { // required인데 값이 없으면 리턴
                if (submitFailed && typeof submitFailed === "function") {
                    submitFailed()
                }

                return
            }

            if (inputProps.min && inputProps.max) { // 최소, 최대값이 존재
                if (inputProps.min > inputTxt.length || inputProps.max < inputTxt.length) {
                    if (submitFailed && typeof submitFailed === "function") {
                        submitFailed()
                    }

                    return
                }
            } else if (inputProps.min) {
                if (inputProps.min > inputTxt.length) {
                    if (submitFailed && typeof submitFailed === "function") {
                        submitFailed()
                    }

                    return
                }
            } else if (inputProps.max) {
                if (inputProps.max < inputTxt.length) {
                    if (submitFailed && typeof submitFailed === "function") {
                        submitFailed()
                    }

                    return
                }
            }

            // 사용 목적에 따라 검증
            if (purpose && typeof purpose === "string") {
                if (purpose === "email") {
                    const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){0,30}@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){0,30}\.[a-zA-Z]{2,3}$/;
                
                    if (!emailRegExp.test(inputTxt)) {
                        if (submitFailed && typeof submitFailed === "function") {
                            submitFailed()
                        }

                        return
                    }
                }
            }

            // custom validate 함수 조건 확인
            if (validate && typeof validate === "function") {
                const res = validate(inputTxt) // validate 함수는 에러 메시지 반환

                if (res instanceof Promise) {
                    res.then(result => {
                        if (typeof result === "string" && result.length > 0) {
                            if (submitFailed && typeof submitFailed === "function") {
                                submitFailed()
                            }

                            return
                        } else { // 검증 통과
                            // submit custom callback -> 검증을 모두 통과했을 때만 실행
                            if (submitSuccess && typeof submitSuccess === "function") {
                                submitSuccess(inputTxt)
                            }
                        }
                    }).catch((err) => {
                        if (submitFailed && typeof submitFailed === "function") {
                            submitFailed()
                        }
                        console.error("custom validation error");

                        return
                    });
                } else if (typeof res === "string" && res.length > 0) {
                    if (submitFailed && typeof submitFailed === "function") {
                        submitFailed()
                    }

                    return
                } else if (typeof res === "string" && res.length === 0) { // 검증 통과
                    // submit custom callback -> 검증을 모두 통과했을 때만 실행
                    if (submitSuccess && typeof submitSuccess === "function") {
                        submitSuccess(inputTxt)
                    }
                }
            } else { // 검증 통과
                // submit custom callback -> 검증을 모두 통과했을 때만 실행
                if (submitSuccess && typeof submitSuccess === "function") {
                    submitSuccess(inputTxt)
                }
            }
        }
    }, [isSubmit, inputTxt, validate, submitSuccess, submitFailed, purpose, inputProps])

    return (
        <RegisterInputBlock>
            <StyledInputLabel>
                <span>{inputLabel}{inputProps?.required ? "*" : null}</span>
                {purpose === "code" && (<TimerSpan>{min}:{String(sec).padStart(2, '0')}</TimerSpan>)}
            </StyledInputLabel>
            {subText && 
            (<SubText>
                {subText}    
            </SubText>)}
            <StyledInputBlock isError={!!error} isFocus={isFocus} onFocus={() => setIsFocus(true)} onBlur= {() => setIsFocus(false)}>
                <StyledInput
                    type={(purpose === "password" && hidePassword) ? "password" : "text"}
                    value={inputTxt} 
                    onChange={onInputChange} 
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                    {...inputProps} 
                />
                {purpose === "password" && 
                (<StyledIcon>
                    {hidePassword ? <VisibilityOffIconCustom onClick={onClickVisibilityOffIcon}/> : <VisibilityIconCustom onClick={onClickVisibilityIcon}/>}
                </StyledIcon>)}
            </StyledInputBlock>
            {error && (
                <ErrorTip>
                    <span>{error}</span>        
                </ErrorTip>
            )}
        </RegisterInputBlock>
    )
}

export default RegisterInput;