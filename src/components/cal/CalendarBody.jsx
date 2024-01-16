import React, { useCallback, useState } from 'react';
import { addDays, endOfMonth, endOfWeek, format, isSameMonth, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import styled, {css} from "styled-components";
import { useGetTagsByMonthQuery } from '../../hooks/queries/useGetTagsByMonthQuery';
import { useGetEventTagsByMonthQuery } from '../../hooks/queries/useGetEventTagsByMonthQuery';

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

    &:hover {
        background-color: rgba(240, 248, 255, 0.7);
    }

    ${
        props => !props.isSameMonth && css`
            pointer-events: none;
    `};

    ${
        props => props.bgColor && css`
            &:hover {
                background-color: rgb(240, 248, 255);
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

const TagBlock = styled.div`
    position: absolute;
    top: 2.3rem;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    padding: 0.3rem;
`;

const CellTag = styled.div`
    font-size: 1.2rem;
    text-align: center;
    border-radius: 2rem;
    color: black;
    padding: 0.2rem 0;

    ${
        props => props.type === 'special' && css`
            color: red;  
        `
    };
    ${
        props => props.type === 'event' && css`
            background-color: #98FB98;  
        `
    };
`;

const CellBox = ({dayObj, setSelectedDate, isSelected, isSameMonth }) => {
    const dayx = dayObj["date"];
    const yoil = dayObj["date"].getDay();
    const isHoliday = dayObj["tags"]?.filter(tag => tag.tagType === 'holiday').length > 0;

    const onSelect = useCallback(() => setSelectedDate(dayx), [dayx, setSelectedDate]);
    let color = "#21252a";
    let bgColor = "transparent";

    if (!isSameMonth) {
        color = "#dddcdb";
        if (yoil === 6) color = "#dddcff";
        if (yoil === 0) color = "#ffdcdb";
        if (isHoliday) color = "#ffdcdb";
    } else {
        if (yoil === 6) color = "blue";
        if (yoil === 0) color = "red";
        if (isHoliday) color = "red";
    
        if (isSelected) {
            bgColor = "rgba(240, 248, 255, 0.7)";
        }
    }

    return (
        <Cell color={color} bgColor={bgColor} isSameMonth={isSameMonth} onClick={onSelect}>
            <CellInner>
                <CellCircle isToday={isSameDay(dayx, new Date())} >
                    {format(dayx, 'd')}
                </CellCircle >
                <TagBlock>
                    {
                        dayObj["tags"]?.map(tag => {
                            if (tag.tagType === "holiday") {
                                return <CellTag type={"special"}>{tag.name}</CellTag>;
                            } else if (tag.tagType === "anniversary" || tag.tagType === "division") {
                                return <CellTag type={"anniversary"}>{tag.name}</CellTag>;
                            } else if (tag.tagType === "event") {
                                return <CellTag type={"event"}>{tag.name}</CellTag>;
                            }
                        })
                    }
                </TagBlock>
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

    const { isPending: isTagPending , data: tagData } = useGetTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    const { isPending: isEventTagPending, data: eventTagData } = useGetEventTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

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

        if (eventTagData) {
            eventTagData.forEach(obj => {
                
            })
        }

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
                     <CellBox 
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