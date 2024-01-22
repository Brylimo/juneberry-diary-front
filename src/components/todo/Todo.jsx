import React, { useCallback, useState } from 'react';
import styled, { css } from "styled-components";

const TodoContent = styled.div`
    width: 100%;
    height: 100%;
    font-family: slowslow, 'Schoolbell', cursive;
`;

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
    flex: 27;
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
`;

const THeaderSmallBox = styled.div`
    flex: 10;
`;

const ScoreBox = styled.div`
    font-size: inherit;
    width: 90%;
    height: 100%;
    border: 1px solid black;
    margin: 0 auto;
    border-radius: 0.3rem;
    position: relative;
`;

const ScoreBoxTitleSpan = styled.div`
    font-size: 1.8rem;
    font-family: sans-serif;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    color: green;
`;

const ScoreBoxScoreSpan = styled.div`
    font-size: 3rem;
    font-family: inherit;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
`;

const THeaderTitleSpan = styled.span`
    font-size: 1.8rem;
    font-family: sans-serif;
    color: green;
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

const THeaderInput = styled.input`
    font-size: inherit;
    width: 100%;
    border: none;
    outline: none;
    font-family: slowslow, 'Schoolbell', cursive;
    letter-spacing: 0.5rem;
`;

const TContentFrame = styled.div`
    padding-top: 1.5rem;
    height: calc(100% - 12rem);
    overflow: auto;
    display: flex;
    flex-direction: row;
`;

const TContentBody = styled.div`
    flex: 27;
    font-size: inherit;
`;

const TContentTimeTable = styled.div`
    flex: 10;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(24, 1fr);
`;

const TContentTimeCell = styled.div`
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    text-align: center;
    font-weight: bold;
    font-family: sans-serif;

    &:nth-child(7n) {
        border-right: none;
    }

    &:nth-child(-n + 7) {
        border-top: 1px solid #999999;
    }

    &:nth-child(-161 + n) {
        border-bottom: 1px solid red;
    }
`;


const Todo = ({ selectedDate }) => {
    const [activeTag, setActiveTag] = useState("todo");

    const onClickTodoTag = useCallback(e => {
        setActiveTag("todo");
    }, [setActiveTag]);

    const onClickStatTag = useCallback(e => {
        setActiveTag("stat");
    }, [setActiveTag]);

    const onClickNoteTag = useCallback(e => {
        setActiveTag("note");
    }, [setActiveTag]);

    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];
    let tdTimeArray = Array.from(
        Array(24), 
        (_, idx) => {
            return [('0' + idx).slice(-2), '', '', '', '', '', ''];
        });

    return (
        <>
            <TodoContent>
                <THeaderFrame>
                    <THeaderBlock>
                        <THeaderLongBox>
                            <THeaderLong>
                                <THeaderTitleSpan>DATE.</THeaderTitleSpan>
                                <THeaderDaySpan>
                                    {`${selectedDate.getFullYear().toString().slice(-2)} . ${('0' + (selectedDate.getMonth()+1)).slice(-2)} . ${('0' + selectedDate.getDate()).slice(-2)}`}
                                </THeaderDaySpan>
                                <THeaderYoilSpan>
                                    {week[selectedDate.getDay()]}
                                </THeaderYoilSpan>
                            </THeaderLong>
                            <THeaderLong>
                                <THeaderTitleSpan>TODAY.</THeaderTitleSpan>
                                <THeaderInput placeholder="what's up?" />
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
                <TContentFrame>
                    <TContentBody>
                        안녕
                    </TContentBody>
                    <TContentTimeTable>
                        {
                            tdTimeArray.map((_, index) => {
                                return tdTimeArray[index].map(time => <TContentTimeCell>{time}</TContentTimeCell>)
                            })
                        }
                    </TContentTimeTable>
                </TContentFrame>
            </TodoContent>
        </>
    );
}

export default Todo;