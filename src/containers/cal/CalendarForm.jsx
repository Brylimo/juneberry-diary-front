import React, { useCallback } from 'react';
import Calendar from '../../components/cal/Calendar';
import { useDispatch, useSelector } from "react-redux";
import { toggleTodoActive } from '../../modules/cal';

const CalendarForm = () => {
    const dispatch = useDispatch();

    const { todoActive } = useSelector(({ cal }) => ({
        todoActive: cal.isTodo
    }));


    const onClickTodoBtn = useCallback(e => {
        dispatch(toggleTodoActive());
    }, [dispatch]);

    return <Calendar
        todoActive={todoActive}
        onClickTodoBtn={onClickTodoBtn}
    />;
}

export default CalendarForm;