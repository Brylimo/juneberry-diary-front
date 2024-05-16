import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import CheckIcon from '@mui/icons-material/Check';

const AddLinkBlock = styled.div`
    position: absolute;
    width: 18rem;
    top: 0;
    left: 0;
    z-index: 20;
    border-radius: 5px;
    border: 2px solid #d0d7de;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    background-color: #ffffff;
    padding: 6px 3px 6px 6px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    ${props =>
        props.top && css`
            top: ${props.top}px;
        `
    }
    ${props =>
        props.left && css`
            left: ${props.left}px;
        `
    }
    ${props =>
        props.isActive && css`
            border: 2px solid #54a0ff;
            background-color: #F6FCFC;
        `
    }
`;
const AddLinkInputBox = styled.div`
    display: flex;
    gap: 3px;
`;

const AddLinkInput = styled.input`
    border: none;
    outline: none;
    padding: 2px;
    border-radius: 10px;
    width: 100%;
`;

const CheckIconBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheckIconCustom = styled(CheckIcon)`
    color: grey;

    ${props =>
        props.isActive && css`
            color: green;
            cursor: pointer;
        `
    }
`;

const AddLink = ({linkTxt, top, left, addLinkBlockRef, onClickAddLinkSubmit, onClickAddLinkCancel, setLinkTxt}) => {
    const [chkBtnActive, setChkBtnActive] = useState(false)

    const onSubmitLink = useCallback((e) => {
        e.preventDefault()
        onClickAddLinkSubmit(linkTxt)
    }, [onClickAddLinkSubmit, linkTxt])

    const onAddLinkInputKeyDown = useCallback(e => {
        if (e.key === "Enter" && e.nativeEvent.isComposing === false && linkTxt.trim() !== '') {
            onSubmitLink(e)
        }
    }, [onSubmitLink, linkTxt])

    useEffect(() => {
        addLinkBlockRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [addLinkBlockRef])

    useEffect(() => {
        if (linkTxt.length > 0) {
            setChkBtnActive(true)
        } else {
            setChkBtnActive(false)
        }
    }, [linkTxt])

    return (
        <OutsideClickHandler onOutsideClick={onClickAddLinkCancel}>
            <AddLinkBlock ref={addLinkBlockRef} top={top} left={left} isActive={chkBtnActive}>
                <AddLinkInputBox>
                    <AddLinkInput placeholder='링크를 입력하세요' value={linkTxt} onKeyDown={onAddLinkInputKeyDown} onChange={e=>setLinkTxt(e.target.value)} />
                    <CheckIconBlock>
                        <CheckIconCustom isActive={chkBtnActive} onClick={onSubmitLink} />
                    </CheckIconBlock>
                </AddLinkInputBox>
            </AddLinkBlock>
        </OutsideClickHandler>
    );
}

export default AddLink;