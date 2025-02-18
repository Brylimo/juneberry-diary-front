import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import CellBox from '../../components/cal/CellBox';
import { initializeTodoHash } from '../../modules/todo';

const CellBoxForm = ({ dayObj, selectedDate, setSelectedDate, setModalActive, isSelected, isSameMonth }) => {
    const dispatch = useDispatch();
    const { eventHash } = useSelector(({ cal }) => ({
        eventHash: cal.eventHash
    }));
    const { emojiHash } = useSelector(({ cal }) => ({
        emojiHash: cal.emojiHash
    }));
    const { todoActive } = useSelector(({ cal }) => ({
        todoActive: cal.todoActive
    }));

    const dayx = dayObj["date"];
    const date = dayx.getDate();
    const events = isSameMonth ? eventHash[date] : undefined;
    const emoji = isSameMonth ? emojiHash[date] : undefined;

    const onSelect = useCallback(() => {
        if (selectedDate.getTime() !== dayx.getTime()) {
            dispatch(initializeTodoHash())
            setSelectedDate(dayx)
        }
        if (todoActive === false) {
            setModalActive(true)
        } else {
            setModalActive(false)
        }
    }, [dayx, selectedDate, todoActive, setModalActive, setSelectedDate, dispatch]);

    return <CellBox 
        dayObj={dayObj}
        onSelect={onSelect}
        isSelected={isSelected}
        isSameMonth={isSameMonth}
        events={events}
        emoji={emoji}
    />;
}

export default CellBoxForm;