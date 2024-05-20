import React, {useCallback} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const NotFoundBlock = styled.div`
    display: flex;
    flex-direction: column;
    height: 200px;
    position: relative;
    top: -6rem;
`;

const NotFoundMainEmoj = styled.div`
    font-size: 6rem;
    text-align: center;
    margin-bottom: 3rem;
`;

const NotFoundMainNoti = styled.div`
    font-size: 3rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1rem;
`;

const NotFoundSubNoti = styled.div`
    text-align: center;
    font-size: 1.6rem;
    color: #888888;
    margin-bottom: 4rem;
`;

const NotFoundBtnBlock = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`

const GoBackBtn = styled.button`
    padding: 1rem 0;
    cursor: pointer;
    flex: 1;
    transition: background-color 0.3s ease;
    background-color: rgb(240, 240, 240);
    border: none;

    &:hover {
        background-color: rgb(220, 220, 220);
    }
`;

const GoMainBtn = styled.button`
    padding: 1rem 0;
    flex: 1;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #007bff;
    color: #fff;
    border: none;

    &:hover {
        background-color: #0069d9;
    }
`;

const NotFoundPage = () => {
    const navigate = useNavigate();

    const onClickGoBackBtn = useCallback(e => {
        navigate(-1)
    }, [navigate]);
    const onClickGoMainBtn = useCallback(e => {
        navigate('/cal/calendar');
    }, [navigate]);


    return (
        <>
            <Helmet>
                <title>page not found</title>
            </Helmet>
            <NotFoundWrapper>
                <NotFoundBlock>
                    <NotFoundMainEmoj>
                        (˘･_･˘)
                    </NotFoundMainEmoj>
                    <NotFoundMainNoti>
                        페이지가 존재하지 않습니다
                    </NotFoundMainNoti>
                    <NotFoundSubNoti>
                        요청하신 주소가 잘못되었거나 변경된 것 같습니다.<br/>
                        다시 한번 확인해 주세요.
                    </NotFoundSubNoti>
                    <NotFoundBtnBlock>
                        <GoBackBtn onClick={onClickGoBackBtn}>뒤로 가기</GoBackBtn>
                        <GoMainBtn onClick={onClickGoMainBtn}>메인 화면 가기</GoMainBtn>
                    </NotFoundBtnBlock>
                </NotFoundBlock>
            </NotFoundWrapper>
        </>
    );
};

export default NotFoundPage;