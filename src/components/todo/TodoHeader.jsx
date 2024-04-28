import React, { useState, useEffect } from 'react';
import styled, {css} from "styled-components";
import useDebounce from '../../hooks/useDebounce';
import { useUpdateTodayTxtMutation } from '../../hooks/mutations/useUpdateTodayTxtMutation';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useGetTodayTxtQuery } from '../../hooks/queries/useGetTodayTxtQuery';

const THeaderFrame = styled.div`
    width: 100%;
    height: 12rem;
    margin-bottom: 0.1rem;
    display: flex;
    flex-direction: column;
`;

const THeaderBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1;
    font-size: 2.5rem;
`;

const THeaderLongBox = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
`;

const THeaderLong = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    gap: 2rem;
    border-bottom: 0.07rem dashed gray;
    padding: 0 1rem;

    ${props =>
        props.kind === "today" &&
        css`
            gap: 1.2rem;
        `
    }
    ${({ theme }) => theme.xs`
        font-size: 1.4rem;
        gap: 1rem;
    `};
`;

const THeaderSmallBox = styled.div`
    flex: 2;
`;

const ScoreBox = styled.div`
    font-size: inherit;
    width: 90%;
    height: 100%;
    border: 1px solid black;
    margin: 0 auto;
    border-radius: 0.3rem;
    position: relative;

    ${({ theme }) => theme.xs`
        width: 100%;
    `};
`;

const ScoreBoxTitleSpan = styled.div`
    font-size: 1.8rem;
    font-family: sans-serif;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    color: green;

    ${({ theme }) => theme.xs`
        font-size: 1.4rem;
    `};
`;

const ScoreBoxScoreSpan = styled.div`
    font-size: 3rem;
    font-family: inherit;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);

    ${({ theme }) => theme.xs`
        font-size: 1.4rem;
    `};
`;

const THeaderTitleSpan = styled.span`
    font-size: 1.8rem;
    font-family: sans-serif;
    color: green;

    ${({ theme }) => theme.xs`
        font-size: 1.4rem;
    `};
`;

const THeaderDaySpan = styled.span`
    font-size: inherit;
    line-height: 100%;
    letter-spacing: 0.2rem;
`;

const THeaderYoilSpan = styled.span`
    font-size: inherit;
    position: relative;
    padding: 0.7rem;

    &:after {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid blue;
        content: '';
        top: 0;
        left: 0;
        border-radius: 110px 80px 130px;
        transfrom: rotate(-5deg);
    }
`;

const THeaderTodayBlock = styled.div`
    flex: 1;
    display: flex;
`;

const THeaderInput = styled.input`
    font-size: inherit;
    width: 100%;
    border: none;
    outline: none;
    font-family: slowslow, 'Schoolbell', cursive;
    letter-spacing: 0.5rem;
`;

const BeatLoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 27px;
`;

const TodoHeader = ({ selectedDate }) => {
    const [todayTxt, setTodayTxt] = useState('');
    const [isPending, debouncedValue] = useDebounce(todayTxt, 1000);
    const [debouncedValueUpdated, setDebouncedValueUpdated] = useState(false);
    const { data: todayTxtData } = useGetTodayTxtQuery(selectedDate);
    const { mutate: updateTodayTxtMutate, isPending: apiPending } = useUpdateTodayTxtMutation();
    const queryClient = useQueryClient();

    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];

    useEffect(() => {
        if (todayTxtData) {
            setTodayTxt(todayTxtData.todayTxt);
        }
    }, [todayTxtData]);

    useEffect(() => {
        if (debouncedValueUpdated && debouncedValue && !isPending) {
            updateTodayTxtMutate(
                {
                    selectedDate,
                    todayTxt: debouncedValue
                },
                {
                    onSuccess: (res) => {
                        queryClient.invalidateQueries({
                            queryKey : ["getTodayTxt", {selectedDate}]
                        })
                    },
                    onError: () => {
                        toast.error("글 저장에 실패했습니다.");
                        return;
                    }
                }
            )
        }
        setDebouncedValueUpdated(false);
    }, [debouncedValue, debouncedValueUpdated, updateTodayTxtMutate])

    useEffect(() => {
        if (debouncedValue !== todayTxt) {
            setDebouncedValueUpdated(true);
        }
    }, [debouncedValue, todayTxt]);

    return (
        <THeaderFrame>
            <THeaderBlock>
                <THeaderLongBox>
                    <THeaderLong kind="date">
                        <THeaderTitleSpan>DATE.</THeaderTitleSpan>
                        <THeaderDaySpan>
                            {`${selectedDate.getFullYear().toString().slice(-2)} . ${('0' + (selectedDate.getMonth()+1)).slice(-2)} . ${('0' + selectedDate.getDate()).slice(-2)}`}
                        </THeaderDaySpan>
                        <THeaderYoilSpan>
                            {week[selectedDate.getDay()]}
                        </THeaderYoilSpan>
                    </THeaderLong>
                    <THeaderLong kind="today">
                        <THeaderTitleSpan>TODAY.</THeaderTitleSpan>
                        <THeaderTodayBlock>
                            <THeaderInput 
                                value={todayTxt} 
                                placeholder="what's up?" 
                                onInput={e=>{
                                    setTodayTxt(e.target.value)
                                    setDebouncedValueUpdated(true);
                                }} 
                            />
                            <BeatLoaderWrapper>
                                {(isPending || apiPending) && debouncedValueUpdated ? <BeatLoader color="#36d7b7" size="5" /> : null}
                            </BeatLoaderWrapper>
                        </THeaderTodayBlock>
                    </THeaderLong>
                </THeaderLongBox>
                <THeaderSmallBox>
                    <ScoreBox>
                        <ScoreBoxTitleSpan>TIME</ScoreBoxTitleSpan>
                        <ScoreBoxScoreSpan>off</ScoreBoxScoreSpan>
                    </ScoreBox>
                </THeaderSmallBox>
            </THeaderBlock>
        </THeaderFrame>
    );
}

export default TodoHeader;