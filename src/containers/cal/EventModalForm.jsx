import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useQueryClient } from '@tanstack/react-query';
import { useAddEventTagListMutation } from "../../hooks/mutations/useAddEventTagListMutation";
import EventModal from '../../components/modal/EventModal';

const EventModalForm = ({ currentMonth, selectedDate }) => {
    const dispatch = useDispatch();
    const { eventHash: { [selectedDate.getDate()]: events } } = useSelector(({ cal }) => ({
        eventHash: cal.eventHash
    }));

    const [ eventTxt, setEventTxt ] = useState('');
    const [ tempEvents, setTempEvents ] = useState([]);
    const [ eventAdderActive, setEventAdderActive ] = useState(false);
    const [ dndActive, setDndActive ] = useState(false);
    
    const queryClient = useQueryClient();
    const { mutate: addEventTagListMutate } = useAddEventTagListMutation();

    const eventAdderEndRef = useRef(null);

    const onEventTxtChange = useCallback(e => {
        setEventTxt(e.target.value);
    }, [setEventTxt]);

    const onEventAdderInputKeyDown = useCallback(e => {
        if (e.key === "Enter" && e.nativeEvent.isComposing === false && eventTxt.trim() !== '') {       
            setTempEvents(tempEvents.concat(eventTxt.trim()));
            setEventTxt('');
        }
    }, [tempEvents, eventTxt]);

    const onTagDragEnd = useCallback((droppedItem) => {
        console.log("hh", droppedItem)
        if (!droppedItem.destination) return;

        let updatedList = [...tempEvents]
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setDndActive(true);
        setTempEvents(updatedList);
    }, [tempEvents]);

    const removeEventTag = (index) => {
        const removedEventAdderTagList = tempEvents.filter((_, i) => {
            return i !== index;
        });
        setTempEvents(removedEventAdderTagList); 
    }

    useEffect(() => {
        setTempEvents(events || []);
    }, [events]);

    useEffect(() => {
        if (eventAdderActive && !dndActive) {
            eventAdderEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [eventAdderActive, dndActive ]);

    return (
        <EventModal
            selectedDate={selectedDate}
            eventTxt={eventTxt}
            eventAdderEndRef={eventAdderEndRef}
            tempEvents={tempEvents}
            onTagDragEnd={onTagDragEnd}
            removeEventTag={removeEventTag}
            onEventTxtChange={onEventTxtChange}
            onEventAdderInputKeyDown={onEventAdderInputKeyDown}
        />
    )
}

export default EventModalForm;