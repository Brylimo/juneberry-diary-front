import React from 'react';
import Calendar from '../../components/cal/Calendar';
import { useSelector } from "react-redux";

const CalendarForm = () => {
    const { todoActive } = useSelector(({ cal }) => ({
        todoActive: cal.isTodo
    }));

    return <Calendar
        todoActive={todoActive}
    />;
}

export default CalendarForm;