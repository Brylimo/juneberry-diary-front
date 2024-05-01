import React, {useState, useEffect} from 'react';
import { addDays, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import CalendarBody from '../../components/cal/CalendarBody';
import { useDispatch } from "react-redux";
import { useGetEventTagsByMonthQuery } from '../../hooks/queries/useGetEventTagsByMonthQuery';
import { useGetTagsByMonthQuery } from '../../hooks/queries/useGetTagsByMonthQuery';
import { storeEvents, storeTags } from '../../modules/cal';

const CalendarBodyForm = ({ currentMonth, selectedDate, setSelectedDate, setModalActive }) => {
    const dispatch = useDispatch();
    const [dayList, setDayList] = useState([]);
    const { data: eventTagData } = useGetEventTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    const { data: tagData } = useGetTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

    const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
    const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
    const startDate = startOfWeek(monthStart); // monthStart가 속한 주의 시작일
    const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일

    useEffect(() => {
        if (tagData) {
            let day = startDate;
            let tempDayList = [];
            let tagHash = {};
            tagData.forEach(obj => {
                if (tagHash[obj.date[2]]) {
                    tagHash[obj.date[2]].push(obj)
                } else {
                    tagHash[obj.date[2]] = [obj]
                }            
            })

            dispatch(
                storeTags({
                    tagHash: tagHash
                })
            );

            while (day <= endDate) {
                if (isSameMonth(day, monthStart)) {
                    tempDayList.push({
                        date: day,
                        tags: tagHash[day.getDate()],  
                    });
                } else {
                    tempDayList.push({
                        date: day,
                        tags: [],  
                    });
                }
                day = addDays(day, 1);
            }
            setDayList(tempDayList)
        }
    }, [tagData, dispatch])

    useEffect(() => {
        if (eventTagData) {
            let eventHash = {};
            eventTagData.forEach(obj => {
                eventHash[obj.date[2]] = obj.eventTags
            });
    
            dispatch(
                storeEvents({
                    eventHash: eventHash
                })
            );
        }
    }, [eventTagData, dispatch])

    return <CalendarBody 
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                dayList={dayList}
                setSelectedDate={setSelectedDate}
                setModalActive={setModalActive}
            />;
}

export default CalendarBodyForm;