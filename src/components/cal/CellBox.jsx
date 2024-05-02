import React, { useCallback } from 'react';
import styled, {css} from "styled-components";
import { format, isSameDay } from "date-fns";

const Cell = styled.div`
    width: 100%;
    position: relative;
    font-size: 16px;
    border-radius: 1rem;
    color: ${(props) => props.color || '#21252a'};
    background-color: ${(props) => props.bgColor || 'transparent'};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
    cursor: default;

    &:hover {
        background-color: rgba(240, 248, 255, 0.7);
    }

    ${
        props => !props.isSameMonth && css`
            pointer-events: none;
    `};

    ${
        props => props.bgColor && css`
            &:hover {
                background-color: rgb(240, 248, 255);
            }
    `};
`;

const CellInner = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const CellCircle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 2.3rem;
    width: 2.3rem;
    text-align: center;
    line-height: 2.3rem;
    border-radius: 50%;
    ${
        props => props.isToday && css`
            background-color: skyblue;
            color: white;    
        `
    };
`;

const TagBlock = styled.div`
    position: absolute;
    top: 2.3rem;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    padding: 0.3rem;
`;

const CellTag = styled.div`
    font-size: 1.2rem;
    text-align: center;
    border-radius: 2rem;
    color: black;
    padding: 0.2rem 0;

    ${
        props => props.type === 'special' && css`
            color: red;  
        `
    };
    ${
        props => props.type === 'event' && css`
            background-color: #98FB98;
        `
    };

    ${({ theme }) => theme.xs`
        font-size: 1rem;
    `};
    ${({ theme }) => theme.xxs`
        font-size: 0.9rem;
    `};
`;

const CellBox = ({ dayObj, onSelect, isSelected, isSameMonth, events }) => {
    const dayx = dayObj["date"];
    const yoil = dayObj["date"].getDay();
    const isHoliday = dayObj["tags"]?.filter(tag => tag.tagType === 'holiday').length > 0;

    let color = "#21252a";
    let bgColor = "transparent";

    if (!isSameMonth) {
        color = "#dddcdb";
        if (yoil === 6) color = "#dddcff";
        if (yoil === 0) color = "#ffdcdb";
        if (isHoliday) color = "#ffdcdb";
    } else {
        if (yoil === 6) color = "blue";
        if (yoil === 0) color = "red";
        if (isHoliday) color = "red";
    
        if (isSelected) {
            bgColor = "rgba(240, 248, 255, 0.7)";
        }
    }

    return (
        <Cell color={color} bgColor={bgColor} isSameMonth={isSameMonth} onClick={onSelect}>
            <CellInner>
                <CellCircle isToday={isSameDay(dayx, new Date())} >
                    {format(dayx, 'd')}
                </CellCircle >
                <TagBlock>
                    {
                        dayObj["tags"]?.map(tag => {
                            if (tag.tagType === "holiday") {
                                return <CellTag type={"special"}>{tag.name}</CellTag>;
                            } else if (tag.tagType === "anniversary" || tag.tagType === "division") {
                                return <CellTag type={"anniversary"}>{tag.name}</CellTag>;
                            }
                            return null;
                        })
                    }
                    {
                        events && events.map(event => {
                            if (event) {
                                return <CellTag type={"event"}>{event}</CellTag>
                            }
                            return null;
                        })
                    }
                </TagBlock>
            </CellInner>
        </Cell>
    );
}

export default CellBox;