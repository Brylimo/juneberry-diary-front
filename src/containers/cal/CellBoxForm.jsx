import React from 'react';
import { useSelector } from "react-redux"
import CellBox from '../../components/cal/CellBox';

const CellBoxForm = ({ dayObj, setSelectedDate, isSelected, isSameMonth }) => {
    const { eventHash } = useSelector(({ cal }) => ({
        eventHash: cal.eventHash
    }));

    const date = dayObj["date"].getDate();
    const events = isSameMonth ? eventHash[date] : undefined;

    return <CellBox 
        dayObj={dayObj}
        setSelectedDate={setSelectedDate}
        isSelected={isSelected}
        isSameMonth={isSameMonth}
        events={events}
    />;
}

export default CellBoxForm;