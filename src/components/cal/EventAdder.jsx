import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ClearIcon from '@mui/icons-material/Clear';

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

const FlushEventBlockBtn = styled.div`
    background-color: #7E57C2;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 3rem;
    transform: translate(0, -50%);
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:active {
        background-color: #5D4037;
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
    gap: 0.2rem;    
    align-items: center;
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

const EventAdder = ({ selectedDate, eventTxt, eventAdderEndRef, tempEvents, onClickClearIconBlock, onClickFlushIconBlock, onTagDragEnd, removeEventTag, onEventTxtChange, onEventAdderInputKeyDown }) => {
    return (
        <>
            <EventAdderBlock>
                <EventAdderHeader>
                    <ExitEventBlockBtn onClick={onClickClearIconBlock} />
                    <FlushEventBlockBtn onClick={onClickFlushIconBlock} />
                    <span>{`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}</span>
                </EventAdderHeader>
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
            </EventAdderBlock>
        </>
    );
}

export default EventAdder;