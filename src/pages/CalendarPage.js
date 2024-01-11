import { useCallback, useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import CalendarHeader from "../components/cal/CalendarHeader";
import CalendarBody from "../components/cal/CalendarBody";
import Todo from "../components/todo/Todo";
import { addMonths, subMonths } from "date-fns";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
    position: relative;
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
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    min-width: 23rem;
    max-height: 35%;
    width: 80%;
    min-height: 4rem;
    border-radius: 1.2rem;
    background-color: white;
    border: solid 1px #e0e0e0;
    z-index: 980;
    overflow: auto;
`;

const EvnetAdderHeader = styled.div`
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    text-align: center;
    font-size: 1.8rem;
    color: green;
    font-family: Georgia;
    flex-wrap: wrap;
`;

const EventAdderBody = styled.div`
    width: 100%;
    min-height: 4rem;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const EventAdderInput = styled.input`
    border: none;
    outline: none;
`;

const EventAdderTagBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: 0.4s all;
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

const DragIndicator = styled.div`
    width: 100%;
    height: 0.2rem;
    background-color: red;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
`;

const CalendarPage = () => {
    const [ todoActive, setTodoActive ] = useState(false);
    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ eventAdderTagList, setEventAdderTagList ] = useState([]);
    const [ eventTxt, setEventTxt ] = useState('');

    let eventAdderTagDrag = useRef();
    let eventAdderTagDragOver = useRef();

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
            setEventAdderTagList(eventAdderTagList.concat({text: eventTxt, isDragging: false}))
            setEventTxt('');
        }
    }, [eventAdderTagList, eventTxt]);

    const onTagDragStart = useCallback((e, idx) => {
        eventAdderTagDrag.current = idx;
    }, []);

    const onTagDragEnter = useCallback((e, idx) => {
        eventAdderTagDragOver.current = idx;

        setEventAdderTagList(eventAdderTagList.map((tag, index) => {
            if (index === idx) {
                return {
                    ...tag,
                    isDragging: true
                }
            } else {
                return {
                    ...tag,
                    isDragging: false
                };
            }
        }));
    }, [eventAdderTagList]);

    const onTagDragEnd = useCallback((e, idx) => {
        const array = [...eventAdderTagList];
        
        const mainTag = array[eventAdderTagDrag.current];
        array.splice(eventAdderTagDrag.current, 1);
        array.splice(eventAdderTagDragOver.current, 0, mainTag);

        eventAdderTagDrag.current = null;
        eventAdderTagDragOver.current = null;

        setEventAdderTagList(array.map(tag => {
            return {
                ...tag,
                isDragging: false
            }
        }))
    }, [eventAdderTagList]);

    useEffect(() => {
        eventAdderEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [eventAdderTagList]);

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <FrameWrapper>
                <TodoBtnBlock onClick={onClickTodoBtn}>
                    <TodoBtnImg src="/logo.svg" alt="btn"></TodoBtnImg>
                </TodoBtnBlock>
                { !todoActive && 
                    (<CFrameMarginBlock>
                        <EventAdderBlock>
                            <EvnetAdderHeader>
                                <span>{`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}</span>
                            </EvnetAdderHeader>
                            <EventAdderBody>
                                <DragDropContext onDragEnd={()=>console.log("hi")}>
                                {
                                    eventAdderTagList?.map((tag, index) => {
                                        return (
                                            <>
                                                <EventAdderTagBlock key={index} draggable droppable 
                                                                    onDragStart={e => onTagDragStart(e, index)} 
                                                                    onDragEnter={e => onTagDragEnter(e, index)}
                                                                    onDragEnd={e => onTagDragEnd(e, index)}
                                                >
                                                    <EventAdderTag>{tag.text}</EventAdderTag>
                                                </EventAdderTagBlock>
                                                {tag.isDragging ? <DragIndicator /> : null}
                                            </>
                                        );
                                    })
                                }
                                </DragDropContext>
                                <EventAdderInput value={eventTxt} placeholder="태그를 입력해주세요." onChange={onEventTxtChange} onKeyDown={onEventAdderInputKeyDown}></EventAdderInput>
                                <div ref={eventAdderEndRef}></div>
                            </EventAdderBody>
                        </EventAdderBlock>
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