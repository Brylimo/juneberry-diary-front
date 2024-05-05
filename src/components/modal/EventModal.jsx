import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, {css} from "styled-components";
import { format, isSameDay } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import useDraggableInPortal from '../../hooks/useDraggableInPortal';
import useScreenSize from '../../hooks/useScreenSize';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import ClearIcon from '@mui/icons-material/Clear';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddIcon from '@mui/icons-material/Add';

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
`;

const InvisibleCellBoardHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
`;

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

const CellBoardFooter = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-top: 1px solid #e5e9f2;
    padding-left: 3px;
`;

const CellBoardInputBox = styled.div`
    height: 75%;
    background-color: #f8f8f8;
    flex: 9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 4px;
`;

const CellBoardInputBtnBox = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CellBoardInputBtn = styled.div`
    width: 80%;
    border-radius: 50%;
    border: 1px solid #e5e9f2;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    
    &::after {
        display: block;
        content: "";
        padding-bottom: 100%;
    }

    &:hover {
        background-color: #e5e9f2;  
    }
`;

const AddIconCustom = styled(AddIcon)`
    color: black;
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
    height: calc(100% - 8.9rem);
    overflow: overlay;
    direction: rtl;
    
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
    direction: ltr;
`;

const Tag = styled.span`
    cursor: default;
    color: black;
    border-radius: 2rem;
    padding: 0.3rem 0.9rem;
    font-size: 1.4rem;
    text-align: center;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    width: 100%;

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
    ${
        props => props.isVisible === false && css`
            display: none;
        `
    };
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
        props => (!props.isRoomOkay && props.invWidth) && css`
            transform: translate(-${props.invWidth}px, -1.2rem)
        `
    };
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
    ${
        props => props.isVisible && css`
            color: grey;
        `
    };
`;

const EventModal = ({ selectedDate, eventTxt, eventAdderEndRef, onClickFlushBtn, onClickAdderInputBtn, tags, currentEmoji, tempEvents, onTagDragEnd, removeEventTag, onEventTxtChange, onEventAdderInputKeyDown, setCurrentEmoji }) => {
    const [cellBoardWidth, setCellBoardWidth] = useState(0)
    const [invisibleCellBoardWidth, setInvisibleCellBoardWidth] = useState(0)
    const [emojiBtnSize, setEmojiBtnSize] = useState(28)
    const [emojiSize, setEmojiSize] = useState(20)
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)
    const [isPickerRoomOkay, setIsPickerRoomOkay] = useState(false)
    const optionalPortal = useDraggableInPortal();
    const screenSize = useScreenSize();
    const eventAdderBodyRef = useRef(null);
    const cellBoardRef = useRef(null);
    const invisibleCellBoardRef = useRef(null);

    let color = "#21252a";
    const yoil = selectedDate.getDay();
    const isHoliday =  tags?.filter(tag => tag.tagType === 'holiday').length > 0;

    if (yoil === 6) color = "blue"; 
    if (yoil === 0) color = "red";
    if (isHoliday) color = "red";

    const updateCellBoardWidth = useCallback(() => {
            if (cellBoardRef.current) {
                const { width } = cellBoardRef.current.getBoundingClientRect();
                setCellBoardWidth(width);
            }
    }, [])

    const updateInvisibleCellBoardWidth = useCallback((e) => {
        if (invisibleCellBoardRef.current) {
            const { width } = invisibleCellBoardRef.current.getBoundingClientRect();
            setInvisibleCellBoardWidth(width);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', updateCellBoardWidth);
        window.addEventListener('resize', updateInvisibleCellBoardWidth);
        updateCellBoardWidth();
        updateInvisibleCellBoardWidth();

        return () => {
            window.removeEventListener('resize', updateCellBoardWidth);
            window.removeEventListener('resize', updateInvisibleCellBoardWidth);
        }
    }, [])

    useEffect(() => {
        if (cellBoardWidth >= 280) {
            setEmojiBtnSize(28)
            setEmojiSize(20)
        } else if (cellBoardWidth < 154) {
            setEmojiBtnSize(12)
            setEmojiSize(10)
        } else if (cellBoardWidth < 188) {
            setEmojiBtnSize(14)
            setEmojiSize(12)
        } else if (cellBoardWidth < 225) {
            setEmojiBtnSize(18)
            setEmojiSize(16)
        } else if (cellBoardWidth < 280) {
            setEmojiBtnSize(22)
            setEmojiSize(18)
        }
    }, [cellBoardWidth])

    useEffect(() => {
        if (screenSize.width > 880) {
            setIsPickerRoomOkay(true)
        } else {
            setIsPickerRoomOkay(false)
        }
    }, [screenSize])

    useEffect(() => {
        const clWidth = eventAdderBodyRef.current?.clientWidth;
        const offWidth = eventAdderBodyRef.current?.offsetWidth

        if (cellBoardRef.current) {
            const { width } = cellBoardRef.current.getBoundingClientRect();

            if (clWidth !== offWidth) {
                setCellBoardWidth(width - scrollbarWidth());
            } else {
                setCellBoardWidth(width);
            }
        }
    }, [tempEvents])

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
                                    { currentEmoji?.length > 0 ? <Emoji>{String.fromCodePoint(...currentEmoji)}</Emoji> : <SentimentSatisfiedAltIconCustom isVisible={isEmojiPickerVisible}/>}
                                </EmojiLink>
                            </EmojiBlock>
                        </CellBoardHeader>
                        <CellBoardFooter>
                            <CellBoardInputBox>
                                <EventAdderInput value={eventTxt} placeholder={`${selectedDate.getMonth()+1}월 ${selectedDate.getDate()}일에 일정추가`} onChange={onEventTxtChange} onKeyDown={onEventAdderInputKeyDown} />
                            </CellBoardInputBox>
                            <CellBoardInputBtnBox>
                                <CellBoardInputBtn>
                                    <AddIconCustom onClick={onClickAdderInputBtn}/>
                                </CellBoardInputBtn>
                            </CellBoardInputBtnBox>
                        </CellBoardFooter>
                    </CellBoardContent>
                </CellBoard>
                <InvisibleCellBoard ref={invisibleCellBoardRef}>
                    <InvisibleCellBoardHeader>
                        <ClearBlock isVisible={!!currentEmoji?.length}>
                            <ClearLine>
                                <DottedLine />
                            </ClearLine>
                            <ClearIconBlock onClick={() => setCurrentEmoji([])}/>
                        </ClearBlock>
                    </InvisibleCellBoardHeader>
                    { isPickerRoomOkay && 
                    <EmojiPickerBlock isVisible={isEmojiPickerVisible} isRoomOkay={isPickerRoomOkay} invWidth={invisibleCellBoardWidth}>
                        <Picker 
                            data={data}
                            emojiSize = {emojiSize}
                            emojiButtonSize={emojiBtnSize} 
                            previewPosition="none" 
                            onEmojiSelect={(e) => {
                                const symbol = e.unified.split("-");
                                const codeArray = [];
                                symbol.forEach((sym) => codeArray.push("0x" + sym));
                                setCurrentEmoji(codeArray);
                                setIsEmojiPickerVisible(!isEmojiPickerVisible)
                            }} 
                        />
                    </EmojiPickerBlock>}
                </InvisibleCellBoard>
                <EventAdderBody ref={eventAdderBodyRef}>
                    {!isPickerRoomOkay && 
                    <EmojiPickerBlock isVisible={isEmojiPickerVisible} invWidth={invisibleCellBoardWidth}>
                        <Picker 
                            data={data}
                            emojiSize = {emojiSize}
                            emojiButtonSize={emojiBtnSize}
                            previewPosition="none" 
                            onEmojiSelect={(e) => {
                                const symbol = e.unified.split("-");
                                const codeArray = [];
                                symbol.forEach((sym) => codeArray.push("0x" + sym));
                                setCurrentEmoji(codeArray);
                                setIsEmojiPickerVisible(!isEmojiPickerVisible)
                            }} 
                        />
                    </EmojiPickerBlock>}
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
                                <div ref={provided.innerRef} {...provided.droppableProps} style={{ direction: "ltr" }}>
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
                    <div ref={eventAdderEndRef}></div>
                </EventAdderBody>
            </CellBoardBlock>
        </EventModalBlock>
    );
}

export default EventModal;