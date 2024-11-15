import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import EventAdder from '../../components/cal/EventAdder';
import { changeEventTags } from '../../modules/cal';
import { useQueryClient } from '@tanstack/react-query';
import { useAddEventTagListMutation } from "../../hooks/mutations/cal/useAddEventTagListMutation";
import { toast } from 'react-toastify'

const EventAdderForm = ({ currentMonth, selectedDate }) => {
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

    const mounted = useRef(false);
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
        if (!droppedItem.destination) return;

        let updatedList = [...tempEvents]
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setDndActive(true);
        setTempEvents(updatedList);
    }, [tempEvents]);

    const onClickClearIconBlock = useCallback(() => {
        setEventAdderActive(false);
    }, []);

    const onClickFlushIconBlock = useCallback(() => {
        if (tempEvents?.length || events?.length) {
            addEventTagListMutate(
                {
                    selectedDate,
                    events: tempEvents
                },
                {
                    onSuccess: () => {
                        dispatch(
                            changeEventTags({
                                key: selectedDate.getDate(),
                                value: tempEvents
                            })
                        )
                        queryClient.invalidateQueries(["getEventTagsByMonth"]);
                        
                        toast.success("태그가 저장되었습니다.");
                    },
                    onError: () => {
                        toast.error("태그 저장에 실패했습니다.");
                        return;
                    }
                }
            )
        }
    }, [tempEvents, events, selectedDate, addEventTagListMutate, queryClient, dispatch]);

    const removeEventTag = (index) => {
        const removedEventAdderTagList = tempEvents.filter((_, i) => {
            return i !== index;
        });
        setTempEvents(removedEventAdderTagList); 
    }

    useEffect(() => {
        if (mounted.current) {
            setEventTxt('');
            setEventAdderActive(true)
        } else {
            mounted.current = true;
        }
    }, [selectedDate])

    useEffect(() => {
        setEventAdderActive(false);
    }, [currentMonth])

    useEffect(() => {
        setTempEvents(events || []);
    }, [events]);

    useEffect(() => {
        if (eventAdderActive && !dndActive) {
            eventAdderEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [eventAdderActive, dndActive ]);

    return (
        <>
            {eventAdderActive && 
            (<EventAdder 
                selectedDate={selectedDate}
                eventTxt={eventTxt}
                eventAdderEndRef={eventAdderEndRef}
                tempEvents={tempEvents}
                onClickClearIconBlock={onClickClearIconBlock}
                onClickFlushIconBlock={onClickFlushIconBlock}
                onTagDragEnd={onTagDragEnd}
                removeEventTag={removeEventTag}
                onEventTxtChange={onEventTxtChange}
                onEventAdderInputKeyDown={onEventAdderInputKeyDown} 
            />)}
        </>
    )
}

export default EventAdderForm;