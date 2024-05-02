import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, {css} from "styled-components";
import { format, isSameDay } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useDraggableInPortal from '../../hooks/useDraggableInPortal';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import ClearIcon from '@mui/icons-material/Clear';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

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
    color: ${(props) => props.color || '#21252a'};

    &::after {
        display: block;
        content: "";
        padding-bottom: 100%;
    }
`;

const InvisibleCellBoard = styled.div`
    flex: 1;
    background-color: transparent;
    position: relative;
`

const CellBoardContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const CellBoardHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 5rem;
    display: flex
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const CellBoardCircle = styled.div`
    width: 5rem;
    height: 100%;
    line-height: 5rem;
    text-align: center;
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

const TagBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    width: 100%;
    gap: 0.2rem;
    align-items: center;
`;

const Tag = styled.span`
    cursor: default;
    color: black;
    border-radius: 2rem;
    padding: 0.3rem 0.9rem;
    font-size: 1.4rem;
    text-align: center;
    font-family: Roboto, Helvetica, Arial, sans-serif;

    ${
        props => props.width && css`
            width: ${props.width}px;    
        `
    };

    ${
        props => props.type === 'holiday' && css`
            color: red;  
        `
    };
    ${
        props => props.type === 'event' && css`
            cursor: pointer;
            background-color: #98FB98;
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

const EmojiBlock = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EmojiLink = styled.a`
    cursor: pointer;
    border: none;
`;

const EmojiPickerBlock = styled.div`
    display: block;
    position: fixed;
    z-index: 9999999;
    ${
        props => !props.isVisible && css`
            display: none;
        `
    };
`;

const Emoji = styled.div`
    font-size: 2rem;
`;

const SentimentSatisfiedAltIconCustom = styled(SentimentSatisfiedAltIcon)`
    width: 2rem;
    height: 2rem;
    color: #c8cac9;
    &:hover {
        color: grey;
    }
`;

const EventModal = ({ selectedDate, eventTxt, eventAdderEndRef, onClickFlushBtn, tags, tempEvents, onTagDragEnd, removeEventTag, onEventTxtChange, onEventAdderInputKeyDown }) => {
    const [cellBoardWidth, setCellBoardWidth] = useState(0)
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)
    const [currentEmoji, setCurrentEmoji] = useState(null)
    const optionalPortal = useDraggableInPortal();
    const cellBoardRef = useRef(null);

    let color = "#21252a";
    const yoil = selectedDate.getDay();
    const isHoliday =  tags?.filter(tag => tag.tagType === 'holiday').length > 0;

    if (yoil === 6) color = "blue";
    if (yoil === 0) color = "red";
    if (isHoliday) color = "red";

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

// 현재 뷰포트의 너비
const viewportWidth = window.innerWidth;

// 현재 뷰포트의 높이
const viewportHeight = window.innerHeight;

console.log(`뷰포트 너비: ${viewportWidth}px`);
console.log(`뷰포트 높이: ${viewportHeight}px`);

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
                <CellBoard ref={cellBoardRef} color={color}>
                    <CellBoardContent>
                        <CellBoardHeader>
                            <CellBoardCircle isToday={isSameDay(selectedDate, new Date())}>
                                {format(selectedDate, 'd')}
                            </CellBoardCircle>
                            <EmojiBlock>
                                <EmojiLink
                                    href="javascript:void(0);"
                                    onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
                                >
                                    { currentEmoji ? <Emoji>{currentEmoji}</Emoji> : <SentimentSatisfiedAltIconCustom />}
                                </EmojiLink>
                            </EmojiBlock>
                        </CellBoardHeader>
                    </CellBoardContent>
                </CellBoard>
                <InvisibleCellBoard>
                    <EmojiPickerBlock isVisible={isEmojiPickerVisible}>
                        <Picker 
                            data={data} 
                            previewPosition="none" 
                            onEmojiSelect={(e) => {
                                setCurrentEmoji(e.native);
                                setIsEmojiPickerVisible(!isEmojiPickerVisible)
                            }} 
                        />
                    </EmojiPickerBlock>
                </InvisibleCellBoard>
                <EventAdderBody>
                    {tags?.map((tag, index) => (
                        <TagBlock>
                            <Tag width={cellBoardWidth} type={tag.tagType}>
                                {tag.name}
                            </Tag>
                        </TagBlock>
                    ))}
                    <DragDropContext onDragEnd={onTagDragEnd}>
                        <Droppable droppableId="list-container">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {tempEvents?.map((tag, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {optionalPortal((provided) => (
                                                <TagBlock ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                    <Tag width={cellBoardWidth} type={"event"}>
                                                        {tag}
                                                    </Tag>
                                                    <ClearBlock>
                                                        <ClearLine>
                                                            <DottedLine />
                                                        </ClearLine>
                                                        <ClearIconBlock onClick={() => removeEventTag(index)}/>
                                                    </ClearBlock>
                                                </TagBlock>
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