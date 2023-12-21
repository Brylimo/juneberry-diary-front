import { addDays, endOfMonth, endOfWeek, format, isSameMonth, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import { Dispatch, SetStateAction, useCallback } from "react";
import styled, {css} from "styled-components";

const CalendarBodyFrame = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 14.28571%);  
`;

const Day = styled.div`
    width: 100%;
    font-size: 18px;
    border-radius: 6px;
    padding: 1px 6px;
    background-color: rgba(204, 204, 255, 0.5);
    text-align: center;
`;

const Cell = styled.div`
    width: 100%;
    position: relative;
    padding: 0.3rem;
    font-size: 16px;
    border-radius: 6px;
    color: ${(props) => props.color || '#21252a'};
    background-color: ${(props) => props.bgColor || 'transparent'};

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    &:hover {
        background-color: rgba(255, 225, 255, 0.7);
    }

    ${props => props.flag && css`
        pointer-events: none;
    `};
    ${
        props => props.bgColor === "rgba(255, 225, 255, 0.7)" && css`
            &:hover {
                background-color: rgb(255, 225, 255);
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

const CellBox = ({dayx, setSelectedDate, color, bgColor, flag }) => {
    const onSelect = useCallback(() => setSelectedDate(dayx), [dayx]);
    
    return (
        <Cell color={color} bgColor={bgColor} flag={flag} onClick={onSelect}>
            <CellInner>
                {format(dayx, 'd')}
            </CellInner>
        </Cell>
    );
}

const CalendarBody = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];
    const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
    const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
    const startDate = startOfWeek(monthStart); // monthStart가 속한 주의 시작일
    const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일
    const today = new Date(); // today

    let days = [];
    let day = startDate;

    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    return (
        <CalendarBodyFrame>
            {week.map((elem) => {
                return <Day key={elem}>{elem}</Day>;
            })}
            {days.map((dayx, index) => {
                return (
                    isSameMonth(dayx, monthStart) ?
                     (isSameDay(dayx, today) && isSameDay(dayx, selectedDate)? 
                      <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} bgColor={"rgba(243, 221, 252, 0.79)"} /> :
                      isSameDay(dayx, today) ?
                      <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} bgColor={"rgba(204, 204, 255, 0.3)"} /> :
                     isSameDay(dayx, selectedDate) ? 
                     <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} bgColor={"rgba(255, 225, 255, 0.7)"} /> : 
                     <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} />) :
                     <CellBox key={index} setSelectedDate={setSelectedDate} dayx={dayx} color={"#dddcdb"} flag={true} />       
                );
            })}
        </CalendarBodyFrame>
    );
};

export default CalendarBody;