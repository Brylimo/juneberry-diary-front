import React, { useCallback, useState, useRef } from 'react';
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';

const ModalBlock = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 19983004;
`;

const ModalWrapper = styled.div`
    position: relative;
    width: auto;
    display: flex;
    justify-content: center;
    margin: 5.5rem 10px 0 10px;
    min-width: 228px;
`;

const ModalContent = styled.div`
    overflow: auto;
    width: 50rem; 
    min-height: 60px;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.4rem;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    background-color: #f5f6fa;
    border: 1px solid #e7e7e7;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1.1rem 1.5rem -0.7rem,
    rgba(0, 0, 0, 0.14) 0 2.4rem 3.8rem 0.3rem,
    rgba(0, 0, 0, 0.12) 0 0.9rem 4.6rem 0.8rem;
    transition: box-shadow 300ms cubiz-bezier(0.4, 0, 0.2, 1) 0ms;

    @media (max-width: 500px) {
        width: 100%;
    }
`

const ModalHeader = styled.div`
    padding: 1.6rem 1.6rem;
    letter-spacing: 0.0075em;
    display: flex;
    flex-shrink: 0;
    font-weight: 500;
    font-size: 1.8rem;
    justify-content: space-between;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e9f2;
`;

const ModalHeaderBtnWrapper = styled.div`
    display: flex;
`;

const ModalBody = styled.div`
    padding: 2rem 2.4rem;
`;

const ModalFooter = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #e5e9f2;
    padding: 0.8rem;
`;

const CloseBtn = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    box-sizing: border-box;
    color: rgb(25, 118, 210);
    padding: 0.6rem 0.8rem;
    cursor: pointer;
`;

const CloseIconBtn = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 2px;
    cursor: pointer;
`;

const Modal = ({ activeState, setActiveState, headerTxt, children }) => {
    const nodeRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0})

    const onClickCloseBtn = useCallback((e) => {
        setActiveState(false);
    }, [setActiveState]);

    const trackPos = data => {
        setPos({ x: data.x, y: data.y })
    }

    return (
        <>
            {activeState && 
                (<ModalBlock>
                    <Draggable
                        nodeRef={nodeRef}
                        onDrag={(e, data) => trackPos(data)}
                        cancel=".ignore-click"                    
                    >
                        <ModalWrapper ref={nodeRef}>
                            <ModalContent>
                                <ModalHeader>
                                    <h5>{headerTxt}</h5>
                                    <ModalHeaderBtnWrapper>
                                        <CloseIconBtn onClick={onClickCloseBtn} className='ignore-click'><CloseIcon style={{width: "20px", height: "20px", opacity: "0.5"}}></CloseIcon></CloseIconBtn>
                                    </ModalHeaderBtnWrapper>
                                </ModalHeader>
                                <ModalBody className='ignore-click'>
                                    {children}
                                </ModalBody>
                                <ModalFooter className='ignore-click'>
                                    <CloseBtn onClick={onClickCloseBtn} className='ignore-click'>닫기</CloseBtn>
                                </ModalFooter>
                            </ModalContent>
                        </ModalWrapper>
                    </Draggable>
                </ModalBlock>)
            }
        </>
    );
}

export default Modal;