import React, { useState } from 'react';
import styled from "styled-components";

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

const TodoHeader = ({ selectedDate }) => {
    const [todayTxt, setTodayTxt] = useState('');
    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];

    return (
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
                        <THeaderInput 
                            value={todayTxt} 
                            placeholder="what's up?" 
                            onChange={e=>setTodayTxt(e.target.value)} 
                        />
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