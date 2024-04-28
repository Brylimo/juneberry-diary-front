import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { useBbox } from '../../hooks/useBbox';
import TodoHeader from './TodoHeader';
import TodoLineForm from '../../containers/todo/TodoLineForm';

const TodoContent = styled.div`
    width: 100%;
    height: 100%;
    font-family: slowslow, 'Schoolbell', cursive;
`;

const TContentFrame = styled.div`
    padding-top: 1.5rem;
    height: calc(100% - 12rem);
    overflow: auto;
    display: flex;
    flex-direction: row;
`;

const TContentBody = styled.div`
    flex: 5;
    font-size: inherit;
`;

const TContentTimeTable = styled.div`
    flex: 2;
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
    ${({ theme }) => theme.xs`
        padding-right: 0.8rem;
    `};
`;

const TodoBlock = styled.div`
    width: 100%;
    height: 100%;
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
    display: grid;
    overflow: auto;
`;

const Todo = ({ selectedDate }) => {
    const [countArray, setCountArray] = useState([]);
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

    let tdTimeArray = Array.from(
        Array(24), 
        (_, idx) => {
            return [('0' + idx).slice(-2), '', '', '', '', '', ''];
        });

    return (
        <TodoContent>
            <TodoHeader selectedDate={selectedDate}/>
            <TContentFrame>
                <TContentBody>
                    <TodoWrapper>
                        <TodoBlock ref={ref}>
                            {countArray.map(value => (
                                <TodoLineForm key={value} index={value} selectedDate={selectedDate} />
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