import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useQueryClient } from '@tanstack/react-query';
import { useAddEventTagListMutation } from "../../hooks/mutations/useAddEventTagListMutation";
import { useAddDayEmojiMutation } from '../../hooks/mutations/useAddDayEmojiMutation';
import EventModal from '../../components/modal/EventModal';
import { changeEmoji, changeEventTags } from '../../modules/cal';

const EventModalForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const { tagHash: { [selectedDate.getDate()]: tags } } = useSelector(({ cal }) => ({
        tagHash: cal.tagHash
    }));
    const { eventHash: { [selectedDate.getDate()]: events } } = useSelector(({ cal }) => ({
        eventHash: cal.eventHash
    }));
    const { emojiHash: { [selectedDate.getDate()]: emojiCodeArray } } = useSelector(({ cal }) => ({
        emojiHash: cal.emojiHash
    }));

    const [ eventTxt, setEventTxt ] = useState('');
    const [ tempEvents, setTempEvents ] = useState([]);
    const [ currentEmoji, setCurrentEmoji ] = useState([])
    const [ eventAdderActive, setEventAdderActive ] = useState(false);
    const [ dndActive, setDndActive ] = useState(false);
    
    const queryClient = useQueryClient();
    const { mutate: addEventTagListMutate } = useAddEventTagListMutation();
    const { mutate: addDayEmojiMutate } = useAddDayEmojiMutation();

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

    const onClickFlushBtn = useCallback(() => {
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
                    },
                    onError: () => {
                        return;
                    }
                }
            )
        }
        if (currentEmoji?.length || emojiCodeArray?.length) {
            addDayEmojiMutate(
                {
                    selectedDate,
                    emojiCodeArray: currentEmoji
                },
                {
                    onSuccess: () => {
                        dispatch(
                            changeEmoji({
                                key: selectedDate.getDate(),
                                value: currentEmoji
                            })
                        )
                        queryClient.invalidateQueries(["getEmojisByMonth"]);
                    },
                    onError: () => {
                        return;
                    }
                }
            )
        }
    }, [tempEvents, events, emojiCodeArray, currentEmoji, selectedDate, addEventTagListMutate, addDayEmojiMutate, queryClient, dispatch]);

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
        setCurrentEmoji(emojiCodeArray || []);
    }, [emojiCodeArray]);

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
            tags={tags}
            currentEmoji={currentEmoji}
            tempEvents={tempEvents}
            onClickFlushBtn={onClickFlushBtn}
            onTagDragEnd={onTagDragEnd}
            removeEventTag={removeEventTag}
            onEventTxtChange={onEventTxtChange}
            onEventAdderInputKeyDown={onEventAdderInputKeyDown}
            setCurrentEmoji={setCurrentEmoji}
        />
    )
}

export default EventModalForm;