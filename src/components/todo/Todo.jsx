import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import { useBbox } from '../../hooks/useBbox';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '../common/Modal';

const TodoContent = styled.div`
    width: 100%;
    height: 100%;
    font-family: slowslow, 'Schoolbell', cursive;
`;

const THeaderFrame = styled.div`
    width: 100%;
    height: 12rem;
    margin-bottom: 0.1rem;
    display: flex;
    flex-direction: column;
`;

const THeaderBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1;
    font-size: 2.5rem;
`;

const THeaderLongBox = styled.div`
    flex: 27;
    display: flex;
    flex-direction: column;
`;

const THeaderLong = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    gap: 2rem;
    border-bottom: 0.07rem dashed gray;
    padding: 0 1rem;
`;

const THeaderSmallBox = styled.div`
    flex: 10;
`;

const ScoreBox = styled.div`
    font-size: inherit;
    width: 90%;
    height: 100%;
    border: 1px solid black;
    margin: 0 auto;
    border-radius: 0.3rem;
    position: relative;
`;

const ScoreBoxTitleSpan = styled.div`
    font-size: 1.8rem;
    font-family: sans-serif;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    color: green;
`;

const ScoreBoxScoreSpan = styled.div`
    font-size: 3rem;
    font-family: inherit;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
`;

const THeaderTitleSpan = styled.span`
    font-size: 1.8rem;
    font-family: sans-serif;
    color: green;
`;

const THeaderDaySpan = styled.span`
    font-size: inherit;
    line-height: 100%;
    letter-spacing: 0.2rem;
`;

const THeaderYoilSpan = styled.span`
    font-size: inherit;
    position: relative;
    padding: 0.7rem;

    &:after {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid blue;
        content: '';
        top: 0;
        left: 0;
        border-radius: 110px 80px 130px;
        transfrom: rotate(-5deg);
    }
`;

const THeaderInput = styled.input`
    font-size: inherit;
    width: 100%;
    border: none;
    outline: none;
    font-family: slowslow, 'Schoolbell', cursive;
    letter-spacing: 0.5rem;
`;

const TContentFrame = styled.div`
    padding-top: 1.5rem;
    height: calc(100% - 12rem);
    overflow: auto;
    display: flex;
    flex-direction: row;
`;

const TContentBody = styled.div`
    flex: 27;
    font-size: inherit;
`;

const TContentTimeTable = styled.div`
    flex: 10;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(24, 1fr);
`;

const TContentTimeCell = styled.div`
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    font-weight: bold;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(7n) {
        border-right: none;
    }

    &:nth-child(-n + 7) {
        border-top: 1px solid #999999;
    }

    &:nth-child(n + 161) {
        border-bottom: 1px solid #999999;
    }
`;

const TodoWrapper = styled.div`
    padding-right: 2rem;
    width: 100%;
    height: 100%;
`;

const TodoBlock = styled.div`
    width: 100%;
    height: 100%;
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
    display: grid;
    overflow: auto;
`;

const TodoLine = styled.div`
    width: 100%;
    border-bottom: 1px solid #dddddd;
    height: 30px;
    display: flex;
    flex-direction: row;
    font-family: slowslow, 'Schoolbell', cursive;
    font-size: 2.3rem;
    position: relative;
`;

const TodoLineGroup = styled.div`
    flex: 3;
    border-right: 1px solid #999999;
    display: flex;
    align-items: center;
`;

const TodoLineContent = styled.div`
    flex: 12;
    border-right: 1px solid #999999;
    position: relative;
`;

const TodoLineCheck = styled.div`
    flex: 1;
    cursor: pointer;
    text-align: center;
`;

const TodoLineGroupInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-family: inherit;
    font-size: inherit;
`;

const TodoLineContentInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-family: inherit;
    font-size: inherit;
`;

const TodoLineSettingIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0.8rem;
`;

const CheckOverlay = styled.div`
    height: 30px;
    width: 5.4rem;
    position: absolute;
    bottom: -30px;
    right: 0;
    z-index: 3000000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: 1.5px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
    padding: 0 0.3rem;
    background-color: white;
`;

const OxIcon = styled.span`
    cursor: pointer;
`;

const DeleteIconBlock = styled(DeleteIcon)`
    cursor: pointer;
`;

const SettingsIconBlock = styled(SettingsIcon)`
    cursor: pointer;
    color: #dddddd;

    &:hover {
        color: #999999;
    }
`;

const CheckOverlayBlock = ({ setChkValue, setChkActive, setLineActive }) => {
    const checkOverlayRef = useRef(null);

    const onClickOIcon = useCallback(() => {
        setChkValue('O');
        setChkActive(false);
    }, [setChkValue, setChkActive]);

    const onClickXIcon = useCallback(() => {
        setChkValue('X');
        setChkActive(false);
    }, [setChkValue, setChkActive]);

    const onClickDeleteIcon = useCallback(() => {
        setLineActive(false);
        setChkActive(false);
    }, [setLineActive, setChkActive]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (checkOverlayRef.current && !checkOverlayRef.current.contains(event.target)) {
                setChkActive(false);
            }
        }

        const handleOutsideClick = event => handleClickOutside(event);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setChkActive]);

    return (
        <CheckOverlay ref={checkOverlayRef}>
            <OxIcon onClick={onClickOIcon}>O</OxIcon>
            <OxIcon onClick={onClickXIcon}>X</OxIcon>
            <DeleteIconBlock onClick={onClickDeleteIcon} />
        </CheckOverlay>
    );
}

const TodoLineBlock = () => {
    const [chkActive, setChkActive] = useState(false);
    const [lineActive, setLineActive] = useState(false);
    const [chkValue, setChkValue] = useState(null);
    const [lineGroupTxt, setLineGroupTxt] = useState('');
    const [lineContentTxt, setLineContentTxt] = useState('');

    const onClickTodoLineCheck = useCallback(() => {
        if (lineActive) {
            setChkActive(true);
        }
    }, [lineActive]);

    useEffect(() => {
        if (lineGroupTxt || lineContentTxt) {
            setLineActive(true);
        } else {
            setLineActive(false);
        }
    }, [lineGroupTxt, lineContentTxt]);

    useEffect(() => {
        if (!lineActive) {
            setLineGroupTxt('');
            setLineContentTxt('');
            setChkValue('')
        }
    }, [lineActive]);

    return (
        <>
            <TodoLine>
                <TodoLineGroup>
                    <TodoLineGroupInput 
                        value={lineGroupTxt} 
                        onChange={e=>setLineGroupTxt(e.target.value)} 
                    />
                </TodoLineGroup>
                <TodoLineContent>
                    <TodoLineContentInput
                        value={lineContentTxt}
                        onChange={e=>setLineContentTxt(e.target.value)} 
                    />
                    {lineActive && <TodoLineSettingIcon>
                        <SettingsIconBlock />
                    </TodoLineSettingIcon>}
                </TodoLineContent>
                <TodoLineCheck onClick={onClickTodoLineCheck}>
                    {!!chkValue && chkValue}
                </TodoLineCheck>

                {(chkActive && lineActive) && 
                <CheckOverlayBlock
                    setChkValue={setChkValue} 
                    setChkActive={setChkActive}
                    setLineActive={setLineActive} 
                />}
            </TodoLine>
            <Modal></Modal>
        </>
    );
}

const Todo = ({ selectedDate }) => {
    const [countArray, setCountArray] = useState([]);
    const [todayTxt, setTodayTxt] = useState('');
    const [bbox, ref] = useBbox();
    let count = useRef(0);

    useEffect(() => {
        if (bbox) {
            let rectHeight = bbox.height;

            while (rectHeight > 0) {
                count.current += 1
                rectHeight -= 30;
            }

            setCountArray(Array.from({ length: count.current - 1}, (_, index) => index));
            count.current = 0;
        }
    }, [bbox]);

    const week = ["Sun", "Mon", "Thu", "Wed", "Thurs", "Fri", "Sat"];
    let tdTimeArray = Array.from(
        Array(24), 
        (_, idx) => {
            return [('0' + idx).slice(-2), '', '', '', '', '', ''];
        });

    return (
        <TodoContent>
            <THeaderFrame>
                <THeaderBlock>
                    <THeaderLongBox>
                        <THeaderLong>
                            <THeaderTitleSpan>DATE.</THeaderTitleSpan>
                            <THeaderDaySpan>
                                {`${selectedDate.getFullYear().toString().slice(-2)} . ${('0' + (selectedDate.getMonth()+1)).slice(-2)} . ${('0' + selectedDate.getDate()).slice(-2)}`}
                            </THeaderDaySpan>
                            <THeaderYoilSpan>
                                {week[selectedDate.getDay()]}
                            </THeaderYoilSpan>
                        </THeaderLong>
                        <THeaderLong>
                            <THeaderTitleSpan>TODAY.</THeaderTitleSpan>
                            <THeaderInput 
                                value={todayTxt} 
                                placeholder="what's up?" 
                                onChange={e=>setTodayTxt(e.target.value)} 
                            />
                        </THeaderLong>
                    </THeaderLongBox>
                    <THeaderSmallBox>
                        <ScoreBox>
                            <ScoreBoxTitleSpan>TIME</ScoreBoxTitleSpan>
                            <ScoreBoxScoreSpan>off</ScoreBoxScoreSpan>
                        </ScoreBox>
                    </THeaderSmallBox>
                </THeaderBlock>
            </THeaderFrame>
            <TContentFrame>
                <TContentBody>
                    <TodoWrapper>
                        <TodoBlock ref={ref}>
                            {countArray.map(value => (
                                <TodoLineBlock key={value} />
                            ))}
                        </TodoBlock>
                    </TodoWrapper>
                </TContentBody>
                <TContentTimeTable>
                    {
                        tdTimeArray.map((_, index) => {
                            return tdTimeArray[index].map(time => <TContentTimeCell>{time}</TContentTimeCell>)
                        })
                    }
                </TContentTimeTable>
            </TContentFrame>
        </TodoContent>
    );
}

export default Todo;