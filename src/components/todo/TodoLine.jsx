import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '../common/Modal';
import TodoTaskModal from '../modal/TodoTaskModal';
import { BeatLoader } from 'react-spinners';

const TodoLineBlock = styled.div`
    width: 100%;
    border-bottom: 1px solid #dddddd;
    height: 30px;
    display: flex;
    flex-direction: row;
    font-family: slowslow, 'Schoolbell', cursive;
    font-size: 2.3rem;
    position: relative;

    &:last-child {
        border-bottom: none;
    }
`;

const TodoLineGroup = styled.div`
    flex: 3;
    border-right: 1px solid #999999;
    display: flex;
    align-items: center;
`;

const TodoLineContent = styled.div`
    flex: 12;
    border-right: 1px solid #999999;
    display: flex;
    padding-right: 0.4rem;
`;

const TodoLineCheck = styled.div`
    flex: 1;
    cursor: pointer;
    text-align: center;
`;

const TodoLineGroupInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-family: inherit;
    font-size: inherit;
`;

const TodoLineContentInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-family: inherit;
    font-size: inherit;
`;

const TodoLineIcons = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 0.3rem;
`;

const CheckOverlay = styled.div`
    height: 30px;
    width: 5.4rem;
    position: absolute;
    bottom: -30px;
    right: 0;
    z-index: 3000000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: 1.5px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
    padding: 0 0.3rem;
    background-color: white;
`;

const OxIcon = styled.span`
    cursor: pointer;
`;

const DeleteIconBlock = styled(DeleteIcon)`
    cursor: pointer;
`;

const SettingsIconBlock = styled(SettingsIcon)`
    cursor: pointer;
    color: #dddddd;
    width: 24px;

    &:hover {
        color: #999999;
    }
`;

const CheckOverlayBlock = ({ setChkValue, setChkActive, setLineActive }) => {
    const checkOverlayRef = useRef(null);

    const onClickOIcon = useCallback(() => {
        setChkValue(1);
        setChkActive(false);
    }, [setChkValue, setChkActive]);

    const onClickXIcon = useCallback(() => {
        setChkValue(2);
        setChkActive(false);
    }, [setChkValue, setChkActive]);

    const onClickDeleteIcon = useCallback(() => {
        setLineActive(false);
        setChkActive(false);
    }, [setLineActive, setChkActive]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (checkOverlayRef.current && !checkOverlayRef.current.contains(event.target)) {
                setChkActive(false);
            }
        }

        const handleOutsideClick = event => handleClickOutside(event);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setChkActive]);

    return (
        <CheckOverlay ref={checkOverlayRef}>
            <OxIcon onClick={onClickOIcon}>O</OxIcon>
            <OxIcon onClick={onClickXIcon}>X</OxIcon>
            <DeleteIconBlock onClick={onClickDeleteIcon} />
        </CheckOverlay>
    );
}

const TodoLine = ({ 
    chkActive,
    isTyping,
    chkValue,
    lineActive,
    lineGroupTxt,
    lineContentTxt,
    onClickTodoLineCheck,
    onFocusTodoInput,
    setChkActive,
    setLineActive,
    setChkValue,
    setLineGroupTxt,
    setLineContentTxt
     }) => {
    const [modalActive, setModalActive] = useState(false);

    const onClickSettingsIcon = useCallback(() => {
        setModalActive(true);
    }, []);

    return (
        <>
            <TodoLineBlock>
                <TodoLineGroup>
                    <TodoLineGroupInput 
                        value={lineGroupTxt} 
                        onChange={e=>setLineGroupTxt(e.target.value)}
                        onInput={onFocusTodoInput} 
                    />
                </TodoLineGroup>
                <TodoLineContent>
                    <TodoLineContentInput
                        value={lineContentTxt}
                        onChange={e=>setLineContentTxt(e.target.value)}
                        onInput={onFocusTodoInput} 
                    />
                    <TodoLineIcons>
                        {lineActive &&
                        (<>
                            {isTyping ? <BeatLoader color="#36d7b7" size="4"></BeatLoader> : <SettingsIconBlock onClick={onClickSettingsIcon} />}
                        </>)}
                    </TodoLineIcons>
                </TodoLineContent>
                <TodoLineCheck onClick={onClickTodoLineCheck}>
                    {!!chkValue && chkValue === 1 ? "O" : chkValue === 2 ? "X" : null}
                </TodoLineCheck>

                {(chkActive && lineActive) && 
                <CheckOverlayBlock
                    setChkValue={setChkValue} 
                    setChkActive={setChkActive}
                    setLineActive={setLineActive} 
                />}
            </TodoLineBlock>
            <Modal activeState={modalActive} setActiveState={setModalActive} headerTxt={lineContentTxt}>
                <TodoTaskModal/>
            </Modal>
        </>
    );
}

export default React.memo(TodoLine);