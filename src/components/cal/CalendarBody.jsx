import React from 'react';
import { addDays, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import styled, {css} from "styled-components";
import { useGetTagsByMonthQuery } from '../../hooks/queries/useGetTagsByMonthQuery';
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
`;

const Day = styled.div`
    width: 100%;
    font-size: 1.8rem;
    border-radius: 0.6rem;
    padding: 0.1rem 0.6rem;
    background-color: rgba(204, 204, 255, 0.5);
    text-align: center;
`;

const CalendarBody = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];
    const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
    const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
    const startDate = startOfWeek(monthStart); // monthStart가 속한 주의 시작일
    const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일

    const { data: tagData } = useGetTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

    let dayList = [];
    let day = startDate;
    let columnCnt = 5;

    if (tagData) {
        let tagHash = {};
        tagData.forEach(obj => {
            if (tagHash[obj.date[2]]) {
                tagHash[obj.date[2]].push(obj)
            } else {
                tagHash[obj.date[2]] = [obj]
            }            
        })

        while (day <= endDate) {
            if (isSameMonth(day, monthStart)) {
                dayList.push({
                    date: day,
                    tags: tagHash[day.getDate()],  
                });
            } else {
                dayList.push({
                    date: day,
                    tags: [],  
                });
            }
            day = addDays(day, 1);
        }
    
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
                        setSelectedDate={setSelectedDate}  
                        isSelected={isSameDay(dayObj["date"], selectedDate)}
                        isSameMonth={isSameMonth(dayObj["date"], monthStart)} 
                     />
                );
            })}
        </CalendarBodyFrame>
    );
};

export default CalendarBody;