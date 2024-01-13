import { useCallback, useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import CalendarHeader from "../components/cal/CalendarHeader";
import CalendarBody from "../components/cal/CalendarBody";
import Todo from "../components/todo/Todo";
import { addMonths, subMonths } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ClearIcon from '@mui/icons-material/Clear';
import { useAddEventTagListMutation } from "../hooks/mutations/useAddEventTagListMutation";

const FrameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 8rem);
    position: absolute;
    top: 8rem;
    background-color: #fffcfb;
`;

const CFrameMarginBlock = styled.div`
    flex: 17.5;
    display: flex;
    justify-content: center;
`;

const CFrame = styled.div`
    width: 100%;
    flex: 65;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0 0.7rem;

    ${
        props => props.isActive && css`
            flex: 1;  
        `
    };
`;

const CalendarFrame = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
`;

const TFrame = styled.div`
    flex: 1;
    padding: 3rem;
`;

const TodoBtnBlock = styled.div`
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
    cursor: pointer;
    z-index: 9000;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #fffff0;
    transition: background-color 0.3 ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 4rem;

    &:hover {
        background-color: #ffffff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:active {
        background-color: #bdc3c7;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
    }
`;

const TodoBtnImg = styled.img`
    width: 60%;
    height: 60%;
    object-fit: cover;
    vertical-align: middle;
`;

const EventAdderBlock = styled.div`
    min-width: 23rem;
    max-height: 35%;
    width: 80%;
    min-height: 2rem;
    border-radius: 1.2rem;
    background-color: white;
    border: solid 1px #e0e0e0;
    z-index: 980;
    overflow: auto;
    margin-top: 17rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EventAdderHeader = styled.div`
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    text-align: center;
    font-size: 1.8rem;
    color: green;
    font-family: Georgia;
    flex-wrap: wrap;
    position: relative;
`;

const ExitEventBlockBtn = styled.div`
    background-color: #00CA4E;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translate(0, -50%);
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:active {
        background-color: #008c38;
    }
`;

const EventAdderBody = styled.div`
    width: 100%;
    min-height: 4rem;
    padding: 0.5rem 0.5rem 1rem 0.5rem;

`;

const EventAdderInput = styled.input`
    border: none;
    outline: none;
`;

const EventAdderTagBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    width: 95%;
    gap: 0.2rem;    align-items: center;
`;

const EventAdderTag = styled.span`
    background-color: pink;
    color: black;
    font-weight: bold;
    border-radius: 2rem;
    padding: 0.3rem 0.9rem;
    font-size: 1.4rem;
    cursor: pointer;
`;

const ClearIconBlock = styled(ClearIcon)`
    color: red;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: rotate(180deg);
    }
`;

const CalendarPage = () => {
    const [ todoActive, setTodoActive ] = useState(false);
    const [ dndActive, setDndActive ] = useState(false);
    const [ eventAdderActive, setEventAdderActive ] = useState(false);

    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ eventAdderTagList, setEventAdderTagList ] = useState([]);
    const [ eventTxt, setEventTxt ] = useState('');

    const { mutate: addEventTagListMutate } = useAddEventTagListMutation();

    const mounted = useRef(false);
    const eventAdderEndRef = useRef(null);

    const prevMonth = useCallback(() => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }, [currentMonth]);
    const nextMonth = useCallback(() => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }, [currentMonth]);

    const onClickTodoBtn = useCallback(e => {
        setTodoActive(prev => !prev);
    }, [setTodoActive]);

    const onEventTxtChange = useCallback(e => {
        setEventTxt(e.target.value);
    }, [setEventTxt]);

    const onEventAdderInputKeyDown = useCallback(e => {
        if (e.key === "Enter" && e.nativeEvent.isComposing === false && eventTxt !== '') {
            setEventAdderTagList(eventAdderTagList.concat(eventTxt));
            setEventTxt('');

            
        }
    }, [eventAdderTagList, eventTxt]);

    const onTagDragEnd = useCallback((droppedItem) => {
        if (!droppedItem.destination) return;

        let updatedList = [...eventAdderTagList]
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setDndActive(true);
        setEventAdderTagList(updatedList);
    }, [eventAdderTagList]);

    const onClickClearIconBlock = useCallback(() => {
        setEventAdderActive(false);
    }, []);

    const removeEventTag = (index) => {
        const removedEventAdderTagList = eventAdderTagList.filter((_, i) => {
            return i !== index;
        }); 
        setEventAdderTagList(removedEventAdderTagList);
    }

    useEffect(() => {
        if (eventAdderActive && !dndActive) {
            eventAdderEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [eventAdderActive, dndActive, eventAdderTagList]);

    useEffect(() => {
        if (mounted.current) {
            setEventTxt('');
            setEventAdderTagList([]);
            setEventAdderActive(true)
        } else {
            mounted.current = true;
        }    
    }, [selectedDate])

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <FrameWrapper>
                <TodoBtnBlock onClick={onClickTodoBtn}>
                    <TodoBtnImg src="/logo.svg" alt="btn"></TodoBtnImg>
                </TodoBtnBlock>
                { !todoActive && 
                    (<CFrameMarginBlock>
                        {eventAdderActive && 
                        (<EventAdderBlock>
                            <EventAdderHeader>
                                <ExitEventBlockBtn onClick={onClickClearIconBlock} />
                                <span>{`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}</span>
                            </EventAdderHeader>
                            <EventAdderBody>
                                <DragDropContext onDragEnd={onTagDragEnd}>
                                    <Droppable droppableId="list-container">
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {eventAdderTagList?.map((tag, index) => (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided) => (
                                                            <EventAdderTagBlock ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                                <EventAdderTag>
                                                                    {tag}
                                                                </EventAdderTag>
                                                                <ClearIconBlock onClick={() => removeEventTag(index)}></ClearIconBlock>
                                                            </EventAdderTagBlock>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <EventAdderInput value={eventTxt} placeholder="태그를 입력하세요.." onChange={onEventTxtChange} onKeyDown={onEventAdderInputKeyDown}></EventAdderInput>
                                <div ref={eventAdderEndRef}></div>
                            </EventAdderBody>
                        </EventAdderBlock>)}
                    </CFrameMarginBlock>)
                }
                <CFrame isActive={todoActive}>
                    <CalendarFrame>
                        <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
                        <CalendarBody currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </CalendarFrame>
                </CFrame>
                { !todoActive && <CFrameMarginBlock></CFrameMarginBlock>}
                { todoActive && 
                    (<TFrame isActive={todoActive}>
                        <Todo selectedDate={selectedDate} />
                    </TFrame>) 
                }
            </FrameWrapper>
        </div>
    );
}

export default CalendarPage;