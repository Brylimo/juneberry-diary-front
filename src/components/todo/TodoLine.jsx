import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '../common/Modal';
import TodoTaskModal from '../modal/TodoTaskModal';

const TodoLineBlock = styled.div`
    width: 100%;
    border-bottom: 1px solid #dddddd;
    height: 30px;
    display: flex;
    flex-direction: row;
    font-family: slowslow, 'Schoolbell', cursive;
    font-size: 2.3rem;
    position: relative;
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
    gap: 0.3rem;
    height: 100%;
    width: 3.3rem;
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

    &:hover {
        color: #999999;
    }
`;

const CheckIconBlock = styled(CheckIcon)`
    cursor: pointer;
    color: #dddddd;

    &:hover {
        color: #00ca4e;
    }
`;

const CheckOverlayBlock = ({ setChkValue, setChkActive, setLineActive }) => {
    const checkOverlayRef = useRef(null);

    const onClickOIcon = useCallback(() => {
        setChkValue('O');
        setChkActive(false);
    }, [setChkValue, setChkActive]);

    const onClickXIcon = useCallback(() => {
        setChkValue('X');
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

const TodoLine = ({ index }) => {
    const [chkActive, setChkActive] = useState(false);
    const [lineActive, setLineActive] = useState(false);
    const [chkValue, setChkValue] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    const [lineGroupTxt, setLineGroupTxt] = useState('');
    const [lineContentTxt, setLineContentTxt] = useState('');

    const onClickTodoLineCheck = useCallback(() => {
        if (lineActive) {
            setChkActive(true);
        }
    }, [lineActive]);

    const onClickSettingsIcon = useCallback(() => {
        setModalActive(true);
    }, []);

    const onClickCheckIcon = useCallback(() => {

    }, []);

    useEffect(() => {
        if (lineGroupTxt || lineContentTxt) {
            setLineActive(true);
        } else {
            setLineActive(false);
        }
    }, [lineGroupTxt, lineContentTxt]);

    useEffect(() => {
        if (!lineActive) {
            setLineGroupTxt('');
            setLineContentTxt('');
            setChkValue('')
        }
    }, [lineActive]);

    return (
        <>
            <TodoLineBlock>
                <TodoLineGroup>
                    <TodoLineGroupInput 
                        value={lineGroupTxt} 
                        onChange={e=>setLineGroupTxt(e.target.value)} 
                    />
                </TodoLineGroup>
                <TodoLineContent>
                    <TodoLineContentInput
                        value={lineContentTxt}
                        onChange={e=>setLineContentTxt(e.target.value)} 
                    />
                    <TodoLineIcons>
                        {lineActive &&
                        (<>
                            <SettingsIconBlock onClick={onClickSettingsIcon} />
                            <CheckIconBlock onClick={onClickCheckIcon}/>
                        </>)}
                    </TodoLineIcons>
                </TodoLineContent>
                <TodoLineCheck onClick={onClickTodoLineCheck}>
                    {!!chkValue && chkValue}
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

export default TodoLine;