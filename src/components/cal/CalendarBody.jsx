import React from 'react';
import { isSameMonth, isSameDay, startOfMonth } from "date-fns";
import styled, {css} from "styled-components";
import CellBoxForm from '../../containers/cal/CellBoxForm';

const CalendarBodyFrame = styled.div`
    width: 100%;
    height: calc(100% - 6.5rem);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    
    ${props =>
        props.columnCnt &&
        css`
            grid-template-rows: 2.4rem repeat(${props.columnCnt}, calc((100% - 2.4rem) / ${props.columnCnt}));
        `
    }

    ${({ theme }) => theme.md`
        height: calc(100vh - 14.5rem);;
    `};
`;

const Day = styled.div`
    width: 100%;
    font-size: 1.8rem;
    border-radius: 0.6rem;
    padding: 0.1rem 0.6rem;
    background-color: rgba(204, 204, 255, 0.5);
    text-align: center;
    ${({ theme }) => theme.xxs`
        font-size: 1.3rem;
    `};
`;

const CalendarBody = ({ currentMonth, selectedDate, dayList, setSelectedDate, setModalActive }) => {
    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];
    const monthStart = startOfMonth(currentMonth);
    let columnCnt = 5;

    if (dayList) {
        if (dayList.length > 35) {
            columnCnt = 6;
        } else if (dayList.length <= 28) {
            columnCnt = 4;
        }
    }

    return (
        <CalendarBodyFrame columnCnt={columnCnt}>
            {week.map((elem) => {
                return <Day key={elem}>{elem}</Day>;
            })}
            {dayList?.map((dayObj, index) => {
                return (
                     <CellBoxForm 
                        key={index}
                        dayObj={dayObj}  
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setModalActive={setModalActive}  
                        isSelected={isSameDay(dayObj["date"], selectedDate)}
                        isSameMonth={isSameMonth(dayObj["date"], monthStart)} 
                     />
                )
            })}
        </CalendarBodyFrame>
    );
};

export default CalendarBody;