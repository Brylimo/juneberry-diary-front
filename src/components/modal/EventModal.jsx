import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, {css} from "styled-components";
import { format, isSameDay } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useDraggableInPortal from '../../hooks/useDraggableInPortal';
import ClearIcon from '@mui/icons-material/Clear';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const EventModalBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: stretch;
    position: relative;
`;

const CellBoardBlock = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
`

const CellBoard = styled.div`
    flex: 6;
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

const InvisibleCellBoard = styled.div`
    flex: 1;
    background-color: transparent;
`

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
    height: 5rem;
    width: 5rem;
    text-align: center;
    line-height: 5rem;
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
    top: 5.2rem;
    left: 0;
    width: 100%;
    min-height: 4rem;
    
    &::after {
        display: block;
        content: "";
    }
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
    text-align: center;
    font-family: Roboto, Helvetica, Arial, sans-serif;

    ${
        props => props.width && css`
            width: ${props.width}px;    
        `
    };
`;

const ClearBlock = styled.div`
    display: flex;
    flex: 1;
`;

const ClearLine = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DottedLine = styled.div`
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%);
    background-position: bottom;
    background-size: 3px 1px;
    background-repeat: repeat-x;
`;

const ClearIconBlock = styled(ClearIcon)`
    color: red;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: absolute;
    left: 3rem;

    &:hover {
        transform: rotate(180deg);
    }
`;

const FlushBlock = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlushContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 66%;
    gap: 1.5rem;
`;

const FlushBtn = styled.div`
    cursor: pointer;
    z-index: 9000;
    width: 100%;
    border-radius: 50%;
    background-color: #fffff8;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease-out;
    position: relative;

    &::after {
        display: block;
        content: "";
        padding-bottom: 100%;
    }

    &:hover {
        background-color: #ffffff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    &:active {
        background-color: #bdc3c7;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
        transform: rotate(180deg);
    }   
`;

const FlushNoti = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #888888;      
`;

const AutorenewIconCustom = styled(AutorenewIcon)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    object-fit: cover;
    vertical-align: middle;
    color: #b95de2;
`;

const EventModal = ({ selectedDate, eventTxt, eventAdderEndRef, onClickFlushBtn, tempEvents, onTagDragEnd, removeEventTag, onEventTxtChange, onEventAdderInputKeyDown }) => {
    const [cellBoardWidth, setCellBoardWidth] = useState(0)
    const optionalPortal = useDraggableInPortal();
    const cellBoardRef = useRef(null);

    const updateCellBoardWidth = useCallback((e) => {
            if (cellBoardRef.current) {
                const { width } = cellBoardRef.current.getBoundingClientRect();
                setCellBoardWidth(width);
            }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', updateCellBoardWidth);
        updateCellBoardWidth();

        return () => {
            window.removeEventListener('resize', updateCellBoardWidth);
        }
    }, [])

    return (
        <EventModalBlock>
            <FlushBlock>
                <FlushContainer>
                    <FlushBtn onClick={onClickFlushBtn}>
                        <AutorenewIconCustom />
                    </FlushBtn>
                    <FlushNoti>
                        Flush
                    </FlushNoti>
                </FlushContainer>
            </FlushBlock>
            <CellBoardBlock>
                <CellBoard ref={cellBoardRef}>
                    <CellBoardContent>
                        <CellBoardCircle isToday={isSameDay(selectedDate, new Date())}>
                            {format(selectedDate, 'd')}
                        </CellBoardCircle>
                    </CellBoardContent>
                </CellBoard>
                <InvisibleCellBoard />
                <EventAdderBody>
                    <DragDropContext onDragEnd={onTagDragEnd}>
                        <Droppable droppableId="list-container">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {tempEvents?.map((tag, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {optionalPortal((provided) => (
                                                <EventAdderTagBlock ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                    <EventAdderTag width={cellBoardWidth}>
                                                        {tag}
                                                    </EventAdderTag>
                                                    <ClearBlock>
                                                        <ClearLine>
                                                            <DottedLine />
                                                        </ClearLine>
                                                        <ClearIconBlock onClick={() => removeEventTag(index)}/>
                                                    </ClearBlock>
                                                </EventAdderTagBlock>
                                            ))}
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
            </CellBoardBlock>
        </EventModalBlock>
    );
}

export default EventModal;