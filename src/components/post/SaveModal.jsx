import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useGetTempPostListQuery } from '../../hooks/queries/useGetTempPostListQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ModalBlock = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 19983004;
    overflow: hidden;
`;

const ModalWrapper = styled.div`
    position: relative;
    width: auto;
    display: flex;
    justify-content: center;
`;

const ModalContent = styled.div`
    width: 100%; 
    min-height: 100vh;
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
`;

const ModalHeader = styled.div`
    padding: 1.6rem 1.6rem 1.6rem 0;
    letter-spacing: 0.0075em;
    display: flex;
    flex-shrink: 0;
    font-weight: 500;
    font-size: 1.8rem;
    justify-content: space-between;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e9f2;
    height: 63px;
`;

const ModalHeaderLeft = styled.div`
    display: flex;
    align-itmes: center;
`

const ModalHeaderTxt = styled.span`
    font-size: 23px;
    display: flex;
    align-items: center;
`

const ModalHeaderSubTxt = styled.span`
    display: flex;
    align-items: center;
    padding-left: 6px;
`;

const ModalHeaderSubSmallTxt = styled.span`
    color: orange;
    padding: 0 5px;
`

const ModalHeaderBtnWrapper = styled.div`
    display: flex;
    padding: 0 10px;
`;

const ModalBody = styled.div`
    padding: 2rem 0;
    height: calc(100vh - 63px);
    overflow: auto;
`

const CloseIconBtn = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const ArrowBackIconCore = styled(ArrowBackIcon)`
    width: 27px;
    height: 27px; 
    opacity: 0.5;

    &:hover {
        opacity: 1;
    }
`

const SaveModal = ({tempCnt, activeState, setActiveState}) => {
    const [page, setPage] = useState(1)
    const [tempItems, setTempItems] = useState([])
    const { data: tempPostList } = useGetTempPostListQuery(page)
    
    const { ref, inView } = useInView({
        threshold: 0.1
    })

    const onClickCloseBtn = useCallback((e) => {
        setActiveState(false);
    }, [setActiveState]);

    useEffect(() => {
        if (tempPostList) {
            setTempItems(prev => [...prev, ...tempPostList])
        }
    }, [tempPostList])

    useEffect(() => {
        if (inView) {
            setPage(prev => prev + 1)
        }
    }, [inView])

    return (
        <ModalBlock>
            <ModalWrapper>
                <ModalContent>
                    <ModalHeader>
                        <ModalHeaderLeft>
                            <ModalHeaderBtnWrapper>
                                <CloseIconBtn onClick={onClickCloseBtn} className='ignore-click'><ArrowBackIconCore /></CloseIconBtn>
                            </ModalHeaderBtnWrapper>
                            <ModalHeaderTxt>임시저장 목록</ModalHeaderTxt>
                            <ModalHeaderSubTxt>(<ModalHeaderSubSmallTxt>{tempCnt}</ModalHeaderSubSmallTxt>)</ModalHeaderSubTxt>
                        </ModalHeaderLeft>
                    </ModalHeader>
                    <ModalBody>
                        {tempItems.map((item, index) => (
                            <div key={index}>{item.title}</div>
                        ))}
                        <div ref={ref}></div>
                    </ModalBody>
                </ModalContent>
            </ModalWrapper>
        </ModalBlock>
    )
}

export default React.memo(SaveModal);