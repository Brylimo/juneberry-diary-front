import React from 'react';
import {produce} from 'immer';
import { useSelector } from "react-redux"
import EventAdder from '../../components/cal/EventAdder';

const EventAdderForm = ({ selectedDate }) => {
    const { eventHash } = useSelector(({ cal }) => ({
        eventHash: cal.eventHash
    }));

    const date = selectedDate.getDate();
    const events = eventHash[date] || [];

    return <EventAdder 
        selectedDate={selectedDate}
        events={events} 
    />;
}

export default EventAdderForm;