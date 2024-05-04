import React, { useCallback } from 'react';
import CalendarHeader from '../../components/cal/CalendarHeader';
import { useDispatch } from "react-redux";
import { addMonths, subMonths } from "date-fns";
import { initializeEventHash, initializeEmojiHash, initializeTagHash } from '../../modules/cal';

const CalendarHeaderForm = ({ currentMonth, setCurrentMonth }) => {
    const dispatch = useDispatch();

    const prevMonth = useCallback(() => {
        dispatch(initializeEventHash());
        dispatch(initializeEmojiHash());
        dispatch(initializeTagHash());
        setCurrentMonth(subMonths(currentMonth, 1));
    }, [currentMonth, setCurrentMonth, dispatch]);
    
    const nextMonth = useCallback(() => {
        dispatch(initializeEventHash());
        dispatch(initializeEmojiHash());
        dispatch(initializeTagHash());
        setCurrentMonth(addMonths(currentMonth, 1));
    }, [currentMonth, setCurrentMonth, dispatch]);

    return <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />;
}

export default CalendarHeaderForm;