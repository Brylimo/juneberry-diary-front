import React, {useState} from 'react';
import styled, { css } from "styled-components";
import CalendarBodyForm from '../../containers/cal/CalendarBodyForm';
import EventAdderForm from '../../containers/cal/EventAdderForm';
import CalendarHeaderForm from '../../containers/cal/CalendarHeaderForm';
import TodoForm from '../../containers/todo/TodoForm';

const FrameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 8rem);
    position: absolute;
    top: 8rem;
    background-color: #fffcfb;

    ${
        props => props.isActive && css`
            background-color: transparent;  
        `
    };
`;

const CFrameMarginBlock = styled.div`
    flex: 17.5;
    display: flex;
    justify-content: center;

    ${({ theme }) => theme.md`
        display: none;
    `};
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
    ${props => props.isActive && props.theme.md`
        display: none;
    `};
    ${({ theme }) => theme.xxs`
        padding: 0;
    `};
`;

const CalendarFrame = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;

    ${
        props => !props.isActive && css`
            min-width: 992px;  
        `
    };
    ${({ theme }) => theme.md`
        min-width: unset;   
    `};
    ${({ theme }) => theme.xxs`
        padding: 0;
    `};
`;

const TFrame = styled.div`
    flex: 1;
    padding: 1rem;
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

const Calendar = ({ todoActive, onClickTodoBtn }) => {
    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    
    return (
        <FrameWrapper isActive={todoActive}>
            <TodoBtnBlock onClick={onClickTodoBtn}>
                <TodoBtnImg src="/logo.svg" alt="btn"></TodoBtnImg>
            </TodoBtnBlock>
            { !todoActive && 
                (<CFrameMarginBlock>
                    <EventAdderForm currentMonth={currentMonth} selectedDate={selectedDate} />
                </CFrameMarginBlock>)
            }
            <CFrame isActive={todoActive}>
                <CalendarFrame isActive={todoActive}>
                    <CalendarHeaderForm currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
                    <CalendarBodyForm currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </CalendarFrame>
            </CFrame>
            { !todoActive && <CFrameMarginBlock />}
            { todoActive && 
                (<TFrame isActive={todoActive}>
                    <TodoForm selectedDate={selectedDate} />
                </TFrame>) 
            }
        </FrameWrapper>
    );
}

export default Calendar;