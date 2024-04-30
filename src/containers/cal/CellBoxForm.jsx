import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import CellBox from '../../components/cal/CellBox';
import { initializeTodoHash } from '../../modules/todo';

const CellBoxForm = ({ dayObj, selectedDate, setSelectedDate, setModalActive, isSelected, isSameMonth }) => {
    const dispatch = useDispatch();
    const { eventHash } = useSelector(({ cal }) => ({
        eventHash: cal.eventHash
    }));
    const { todoActive } = useSelector(({ cal }) => ({
        todoActive: cal.isTodo
    }));

    const dayx = dayObj["date"];
    const date = dayx.getDate();
    const events = isSameMonth ? eventHash[date] : undefined;

    const onSelect = useCallback(() => {
        if (selectedDate.getTime() !== dayx.getTime()) {
            dispatch(initializeTodoHash())
            setSelectedDate(dayx)
            if (!todoActive) {
                setModalActive(true)
            }
        }
    }, [dayx, selectedDate, setSelectedDate, dispatch]);

    return <CellBox 
        dayObj={dayObj}
        onSelect={onSelect}
        isSelected={isSelected}
        isSameMonth={isSameMonth}
        events={events}
    />;
}

export default CellBoxForm;