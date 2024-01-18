import React from 'react';
import CalendarBody from '../../components/cal/CalendarBody';
import { useDispatch } from "react-redux"
import { useGetEventTagsByMonthQuery } from '../../hooks/queries/useGetEventTagsByMonthQuery';
import { storeEvents } from '../../modules/cal';

const CalendarBodyForm = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const dispatch = useDispatch();
    const { data: eventTagData } = useGetEventTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

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

    return <CalendarBody 
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} 
            />;
}

export default CalendarBodyForm;