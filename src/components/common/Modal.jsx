import React, {useCallback} from 'react';
import styled from "styled-components";

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
    position: absolute;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    width: 60rem;
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubiz-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 1px solid #e7e7e7;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.4rem;
    margin: 3.2rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1.1rem 1.5rem -0.7rem,
                rgba(0, 0, 0, 0.14) 0 2.4rem 3.8rem 0.3rem,
                rgba(0, 0, 0, 0.12) 0 0.9rem 4.6rem 0.8rem;
    
`;

const ModalHeader = styled.div`
    height: 6.4rem;
    padding: 1.6rem 2.4rem;
    letter-spacing: 0.0075em;
    display: flex;
    font-weight: 500;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
`;

const ModalBody = styled.div`
    padding: 2rem 2.4rem;
`;

const ModalClose = styled.div`
    padding: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

const Modal = ({ activeState, setActiveState, headerTxt, children }) => {
    const onClickCloseBtn = useCallback((e) => {
        setActiveState(false);
    }, [setActiveState]);

    return (
        <>
            {activeState && 
                (<ModalBlock>
                    <ModalWrapper>
                        <ModalHeader>
                            {headerTxt}
                        </ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                        <ModalClose>
                            <CloseBtn onClick={onClickCloseBtn}>CLOSE</CloseBtn>
                        </ModalClose>
                    </ModalWrapper>
                </ModalBlock>)
            }
        </>
    );
}

export default Modal;