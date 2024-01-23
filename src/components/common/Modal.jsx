import React from 'react';
import styled from "styled-components";

const ModalBlock = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.03);
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
    box-shadow: rgba(0, 0, 0, 0.02) 0 1.1rem 1rem -0.7rem,
                rgba(0, 0, 0, 0.014) 0 0.26rem 0.38rem 0.05rem,
                rgba(0, 0, 0, 0.012) 0 0.09rem 4.6rem 0.18rem;
    
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

const ModalClose = styled.div`

`;

const Modal = () => {
    return (
        <ModalBlock>
            <ModalWrapper>
                <ModalHeader>
                    Settings
                </ModalHeader>
                <ModalClose>
                    
                </ModalClose>
            </ModalWrapper>
        </ModalBlock>
    );
}

export default Modal;