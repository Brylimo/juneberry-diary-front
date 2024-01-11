import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import CalendarHeader from "../components/cal/CalendarHeader";
import CalendarBody from "../components/cal/CalendarBody";
import Todo from "../components/todo/Todo";
import { addMonths, subMonths } from "date-fns";

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
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 23rem;
    width: 80%;
    min-height: 10rem;
    border-radius: 1.2rem;
    background-color: white;
    border: solid 1px #e0e0e0;
    z-index: 980;
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
    padding: 0.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem
`;

const EventAdderInput = styled.input`
    border: none;
    outline: none;
`;

const EventAdderTag = styled.div`
    background-color: pink;
    color: black;
    font-weight: bold;
    border-radius: 2rem;
    padding: 0.3rem 0.9rem;
    font-size: 1.4rem;
    display: inline-block;
`;

const CalendarPage = () => {
    const [ todoActive, setTodoActive ] = useState(false);
    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ eventAdderTagList, setEventAdderTagList ] = useState([]);
    const [ eventTxt, setEventTxt ] = useState('');

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

    const onEventAdderInputKeyUp = useCallback(e => {
        if (e.keyCode === 13) {
            setEventAdderTagList(eventAdderTagList.concat(eventTxt))
            setEventTxt('');
        }
    }, [eventAdderTagList, eventTxt]);

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
                                {
                                    eventAdderTagList?.map(tag => {
                                        return <EventAdderTag>{tag}</EventAdderTag>;
                                    })
                                }
                                <EventAdderInput value={eventTxt} placeholder="태그를 입력해주세요." onChange={onEventTxtChange} onKeyUp={onEventAdderInputKeyUp}></EventAdderInput>
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