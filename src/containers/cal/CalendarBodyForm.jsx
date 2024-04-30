import React, {useEffect} from 'react';
import CalendarBody from '../../components/cal/CalendarBody';
import { useDispatch } from "react-redux";
import { useGetEventTagsByMonthQuery } from '../../hooks/queries/useGetEventTagsByMonthQuery';
import { storeEvents } from '../../modules/cal';

const CalendarBodyForm = ({ currentMonth, selectedDate, setSelectedDate, setModalActive }) => {
    const dispatch = useDispatch();
    const { isPending: isEventPending, data: eventTagData } = useGetEventTagsByMonthQuery(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

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
                setSelectedDate={setSelectedDate}
                setModalActive={setModalActive}
            />;
}

export default CalendarBodyForm;