import React, { useState } from 'react';
import styled, { css } from "styled-components";
import CalendarBodyForm from '../../containers/cal/CalendarBodyForm';
import EventAdderForm from '../../containers/cal/EventAdderForm';
import CalendarHeaderForm from '../../containers/cal/CalendarHeaderForm';
import TodoForm from '../../containers/todo/TodoForm';
import EventModalForm from '../../containers/cal/EventModalForm';
import Modal from '../common/Modal';

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

const Calendar = ({ todoActive }) => {
    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ modalActive, setModalActive ] = useState(false);

    return (
        <FrameWrapper isActive={todoActive}>
            { !todoActive && 
                (<CFrameMarginBlock>
                    {/*<EventAdderForm currentMonth={currentMonth} selectedDate={selectedDate} />*/}
                </CFrameMarginBlock>)
            }
            { !todoActive &&
                (<Modal
                    activeState={modalActive} 
                    setActiveState={setModalActive} 
                    headerTxt={`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}
                 >
                    <EventModalForm currentMonth={currentMonth} selectedDate={selectedDate}/>
                </Modal>)
            }
            <CFrame isActive={todoActive}>
                <CalendarFrame isActive={todoActive}>
                    <CalendarHeaderForm currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
                    <CalendarBodyForm currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setModalActive={setModalActive} />
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