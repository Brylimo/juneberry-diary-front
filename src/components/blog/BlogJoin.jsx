import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { BeatLoader } from 'react-spinners';

const BlogJoinWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

const BlogJoinBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
    padding: 1rem 1rem;
    gap: 15px;

    ${({ theme }) => theme.sm`
        width: 100%;
    `};
`

const TxtBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    letter-spacing: 3px;
`;

const PlatformSpan = styled.span`
    font-size: 35px;
    font-weight: bold;
`

const WelcomeSpan = styled.span`
    font-size: 35px;
`

const TextLine = styled.div`
    font-size: 19px;
    letter-spacing: 2px;
`

const InputBlock = styled.div`
    display: flex
    flex-direction: column;
    margin-top: 5px;
`

const BlognameInputBlock = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    border-bottom: 1px solid #d0d7de;
    padding-bottom: 10px;
`

const BlognameInput = styled.input`
    width: 100%;
    outline: none;
    border: none;
    font-size: 22px;
    margin-right: 2px;
    
    &::placeholder {
        color: #c0c7ce;
    }
`

const BlognameInitBtn = styled.button`
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #91969B;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`

const CloseIconCustom = styled(CloseIcon)`
    width: 12px;
    height: 12px;
    color: white;
`

const InputBottomIdBlock = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #868E96;
`

const InputBottomLeftBlock = styled.div`
    display: flex;
    align-items: center;
`

const InputBottomBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    color: #868E96;
`

const SubmitBtn = styled.button`
    margin-top: 3rem;
    padding: 1.3rem 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border: none;
    color: white;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.8);

    &:hover {
            background-color: rgba(0, 0, 0, 1);
    }

    ${
        props => !props.active && css`
            cusor: default;
            pointer-events: none;
            background-color: rgba(0, 0, 0, 0.6);    
        `
    };
`

const PhaseBlock = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

const Phase = styled.div`
    width: 35px;
    height: 8px;
    background-color: rgb(235, 235, 235);
    border-radius: 40px;
    cursor: pointer;

    ${
        props => props.active && css`
            background-color: rgb(205, 205, 205)
        `
    };

    ${
        props => ((props.active && props.idConfirm) || (props.active && props.nameConfirm)) && css`
            background-color: rgb(66, 215, 96)
        `
    };

    ${
        props => ((!props.active && props.idConfirm) || (!props.active && props.nameConfirm)) && css`
            border: 1px solid rgb(66, 215, 96);
            background-color: transparent;
        `
    };
`

const BlogJoin = ({ user, blogId, blogname, blog, idObj, idDone, isPending, submitActive, setSubmitActive, setBlogname, handleBlogIdInput, onClickBlogIdCloseIcon, onClickSubmitBtn }) => {  
    const [curPhase, setCurPhase] = useState(0)

    const  onClickBlognameCloseIcon = useCallback(() => {
        setBlogname("")
        setSubmitActive(false)
    }, [setSubmitActive, setBlogname])

    const onClickPhase = useCallback((idx) => {
        setCurPhase(idx)
    }, [])

    const onClickConfirmBtn = useCallback(() => {
        setCurPhase(prev => prev + 1)
    }, [])

    const handleBlognameInput = useCallback((e) => {
        if (e.target.value?.length <= 35) {
            setBlogname(e.target.value)
        }
        if (e.target.value?.length > 0) {
            setSubmitActive(true)
        } else {
            setSubmitActive(false)
        }
    }, [setSubmitActive, setBlogname])

    return (
        <BlogJoinWrapper>
            <BlogJoinBlock>
                <PhaseBlock>
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <Phase key={idx} active={curPhase === idx} idConfirm={idDone && idx === 0} nameConfirm={blogname && idx === 1}  onClick={() => onClickPhase(idx)} />
                    ))}
                </PhaseBlock>
                <TxtBlock style={{ marginBottom: "35px" }}>
                    <PlatformSpan>Juneberry Diary</PlatformSpan>
                    <WelcomeSpan><span style={{color: "#B22222"}}>블로그</span> 가입을 환영합니다!</WelcomeSpan>
                </TxtBlock>
                <TxtBlock>
                    { curPhase === 0 && (
                        <>
                        <TextLine>
                            <span style={{fontWeight: "bold"}}>{user.username}</span>님,
                        </TextLine>
                        <TextLine>
                            앞으로 사용하실 블로그의 아이디를 알려주세요.
                        </TextLine>
                    </>
                    )}
                    { curPhase === 1 && (
                        <>
                            <TextLine>
                                <span style={{fontWeight: "bold"}}>{user.username}</span>님,
                            </TextLine>
                            <TextLine>
                                앞으로 사용하실 블로그 이름을 알려주세요.
                            </TextLine>
                        </>
                    )}
                </TxtBlock>
                <InputBlock>
                    { curPhase === 0 && (
                        <>
                            <BlognameInputBlock>
                                <BlognameInput value={blogId} onChange={handleBlogIdInput} placeholder='블로그 아이디'/>
                                <BlognameInitBtn>
                                    <CloseIconCustom onClick={onClickBlogIdCloseIcon} />
                                </BlognameInitBtn>
                            </BlognameInputBlock> 
                            <InputBottomIdBlock>
                                <InputBottomLeftBlock>
                                    {(blog && isPending) ? <BeatLoader color="rgb(66, 215, 96)" size="5" /> : 
                                        (idObj?.msg ? <span>{idObj.msg}</span> : null)}
                                </InputBottomLeftBlock>
                                {blogId.length}/35
                            </InputBottomIdBlock>
                        </>
                    )}
                    { curPhase === 1 && (
                        <>
                            <BlognameInputBlock>
                                <BlognameInput value={blogname} onChange={handleBlognameInput} placeholder={`ex) ${user.username}님의 블로그`} />
                                <BlognameInitBtn>
                                    <CloseIconCustom onClick={onClickBlognameCloseIcon} />
                                </BlognameInitBtn>
                            </BlognameInputBlock> 
                            <InputBottomBlock>
                                {blogname.length}/35
                            </InputBottomBlock>
                        </>
                    )}
                </InputBlock>
                { curPhase === 0 && (<SubmitBtn active={idObj?.isOkay} onClick={onClickConfirmBtn}>확인</SubmitBtn>) }
                { curPhase === 1 && (<SubmitBtn active={idObj?.isOkay && submitActive} onClick={onClickSubmitBtn}>제출</SubmitBtn>) }
            </BlogJoinBlock>
        </BlogJoinWrapper>
    )
}

export default React.memo(BlogJoin);