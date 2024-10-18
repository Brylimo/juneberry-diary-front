import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useGetPostListQuery } from '../../hooks/queries/post/useGetPostListQuery';
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
    padding: 2rem 10%;
    height: calc(100vh - 63px);
    overflow: auto;
    background-color: white;
`

const TempCard = styled.div`
    padding: 30px;
    cursor: pointer;
    border-bottom: 1px solid #e5e9f2;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TempCardTitle = styled.span`
    font-size: 25px;    
`;

const TempCardDate = styled.span`
    font-size: 16px;
    color: #B6B6B6;
`;

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

const SaveModal = ({tempCnt, tempPosts, setActiveState, onClickTempCard, onChangeField}) => {
    const { id: paramId } = useParams()
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true);
    const { isPending, isFetching, isLoading, data: tempPostList } = useGetPostListQuery({blogId: paramId, page, isTemp: true, size: 10})
    
    const { ref, inView } = useInView()

    const onClickCloseBtn = useCallback((e) => {
        setActiveState(false);
    }, [setActiveState]);

    useEffect(() => {
        if (isPending || isFetching || !hasMore) return

        if (page === 0 && tempPostList) {
            onChangeField({key: 'tempPosts', value: [...tempPostList]})
        } else if (tempPostList) {
            onChangeField({key: 'tempPosts', value: [...tempPosts, ...tempPostList]})
        }

        if (tempPostList.length < 10) {
            setHasMore(false);
        }

    }, [tempPostList, isPending, isFetching])

    useEffect(() => {
        if (isLoading) return

        if (inView && hasMore) {
            setPage(prev => prev + 1)
        }
    }, [inView])

    useEffect(() => {
        return () => {
            setPage(0)
        }
    })

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
                        {tempPosts.map((item, index) => (
                            <TempCard key={index} onClick={() => onClickTempCard(item)}>
                                <TempCardTitle>{item.title}</TempCardTitle>
                                <TempCardDate>{item.updatedDateTime}</TempCardDate>
                            </TempCard>
                        ))}
                        <div ref={ref}></div>
                    </ModalBody>
                </ModalContent>
            </ModalWrapper>
        </ModalBlock>
    )
}

export default React.memo(SaveModal);