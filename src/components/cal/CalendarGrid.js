import React, { useCallback } from 'react';
import { addDays, endOfMonth, endOfWeek, format, isSameMonth, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import styled, {css} from "styled-components";

const CalendarGridFrame = styled.div`
    width: 100%;
    height: calc(100% - 8rem);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    
    ${props =>
        props.columnCnt &&
        css`
            grid-template-rows: 2.4rem repeat(${props.columnCnt}, calc((100% - 2.4rem) / ${props.columnCnt}));
        `
    }
`;

const Day = styled.div`
    width: 100%;
    font-size: 1.8rem;
    border-radius: 0.6rem;
    padding: 0.1rem 0.6rem;
    background-color: rgba(204, 204, 255, 0.5);
    text-align: center;
`;

const Cell = styled.div`
    width: 100%;
    position: relative;
    padding: 0.3rem;
    font-size: 16px;
    border-radius: 1rem;
    color: ${(props) => props.color || '#21252a'};
    background-color: ${(props) => props.bgColor || 'transparent'};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    &:hover {
        background-color: rgba(240, 248, 255, 0.7);
    }

    ${props => props.flag && css`
        pointer-events: none;
    `};
    ${
        props => props.bgColor === "rgba(240, 248, 255, 0.7)" && css`
            &:hover {
                background-color: rgb(240, 248, 255);
            }
    `};
    ${
        props => (props.bgColor === "rgba(204, 204, 255, 0.3)" || props.bgColor === "rgba(243, 221, 252, 0.79)")  && css`
            &:hover {
                background-color: rgba(243, 221, 252, 0.79);
            }
    `};
`;

const CellInner = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const CellCircle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 2.3rem;
    width: 2.3rem;
    text-align: center;
    line-height: 2.3rem;
    border-radius: 50%;
    ${
        props => props.isToday && css`
            background-color: skyblue;
            color: white;    
        `
    };
`;

const CellBox = ({dayx, setSelectedDate, color, bgColor, flag, isToday }) => {
    const onSelect = useCallback(() => setSelectedDate(dayx), [dayx, setSelectedDate]);
    
    return (
        <Cell color={color} bgColor={bgColor} flag={flag} onClick={onSelect}>
            <CellInner>
                <CellCircle isToday={isToday} >
                    {format(dayx, 'd')}
                </CellCircle >
            </CellInner>
        </Cell>
    );
}

const CalendarGrid = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];
    const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
    const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
    const startDate = startOfWeek(monthStart); // monthStart가 속한 주의 시작일
    const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일
    const today = new Date(); // today

    let days = [];
    let day = startDate;
    let columnCnt = 5;

    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    if (days.length > 35) {
        columnCnt = 6;
    } else if (days.length <= 28) {
        columnCnt = 4;
    }

    return (
        <CalendarGridFrame columnCnt={columnCnt}>
            {week.map((elem) => {
                return <Day key={elem}>{elem}</Day>;
            })}
            {days.map((dayx, index) => {
                return (
                    isSameMonth(dayx, monthStart) ?
                     (isSameDay(dayx, today) && isSameDay(dayx, selectedDate)? 
                      <CellBox key={index} isToday={true} setSelectedDate={setSelectedDate} dayx={dayx} bgColor={"rgba(240, 248, 255, 0.7)"} /> :
                      isSameDay(dayx, today) ?
                      <CellBox key={index} isToday={true} setSelectedDate={setSelectedDate} dayx={dayx} /> :
                     isSameDay(dayx, selectedDate) ? 
                     <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} bgColor={"rgba(240, 248, 255, 0.7)"} /> : 
                     <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} />) :
                     <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} color={"#dddcdb"} flag={true} />
                );
            })}
        </CalendarGridFrame>
    );
};

export default CalendarGrid;