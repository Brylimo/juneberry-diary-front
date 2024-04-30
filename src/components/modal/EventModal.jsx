import React from 'react';
import styled, {css} from "styled-components";
import { format, isSameDay } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ClearIcon from '@mui/icons-material/Clear';

const EventModalBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CellBoard = styled.div`
    width: 60%;
    position: relative;
    border: 1px solid #e5e9f2;
    border-radius: 1rem;
    background-color: rgba(240, 248, 255, 0.7);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &::after {
        display: block;
        content: "";
        padding-bottom: 100%;
    }
`;

const CellBoardContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const CellBoardCircle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 6rem;
    width: 6rem;
    text-align: center;
    line-height: 6rem;
    border-radius: 50%;
    font-size: 30px;
    ${
        props => props.isToday && css`
            background-color: skyblue;
            color: white;    
        `
    };
`;

const EventAdderBody = styled.div`
    position: absolute;
    top: 6rem;
    left: 0;
    width: 100%;
    min-height: 4rem;
`;

const EventAdderInput = styled.input`
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
`;

const EventAdderTagBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    width: 100%;
    gap: 0.2rem;
    align-items: center;
`;

const EventAdderTag = styled.span`
    background-color: #98FB98;
    color: black;
    border-radius: 2rem;
    padding: 0.3rem 0.9rem;
    font-size: 1.4rem;
    cursor: pointer;
    width: 100%;
    text-align: center;
`;

const ClearIconBlock = styled(ClearIcon)`
    color: red;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: rotate(180deg);
    }
`;

const EventModal = ({ selectedDate, eventTxt, eventAdderEndRef, tempEvents, onTagDragEnd, removeEventTag, onEventTxtChange, onEventAdderInputKeyDown }) => {
    return (
        <EventModalBlock>
            <CellBoard>
                <CellBoardContent>
                    <CellBoardCircle isToday={isSameDay(selectedDate, new Date())}>
                        {format(selectedDate, 'd')}
                    </CellBoardCircle>
                </CellBoardContent>
                <EventAdderBody>
                    <DragDropContext onDragEnd={onTagDragEnd}>
                        <Droppable droppableId="list-container">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {tempEvents?.map((tag, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <EventAdderTagBlock ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                    <EventAdderTag>
                                                        {tag}
                                                    </EventAdderTag>
                                                </EventAdderTagBlock>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <EventAdderInput value={eventTxt} placeholder="태그를 입력하세요.." onChange={onEventTxtChange} onKeyDown={onEventAdderInputKeyDown} />
                    <div ref={eventAdderEndRef}></div>
                </EventAdderBody>
            </CellBoard>
        </EventModalBlock>
    );
}

export default EventModal;