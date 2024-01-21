import React, { useCallback, useState } from 'react';
import styled, { css } from "styled-components";

const TodoContent = styled.div`
    width: 100%;
    height: 100%;
    font-family: 'Cute Font', sans-serif;
`;

const THeaderFrame = styled.div`
    width: 100%;
    height: 15rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
`;

const THeaderBlock = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
`;

const THeaderLongBox = styled.div`
    flex: 3;
    border-bottom: 0.07rem solid gray;
    display: flex;
    align-items: center;
`;

const THeaderSmallBox = styled.div`
    flex: 1;
`;

const THeaderDaySpan = styled.span`
    font-size: 4rem;
    line-height: 100%;
    letter-spacing: 2px;
`;

const TContentFrame = styled.div`
    height: calc(100% - 3.6rem);
    padding: 1.5rem;
    overflow: auto
`;


const Todo = ({ selectedDate }) => {
    const [activeTag, setActiveTag] = useState("todo");

    const onClickTodoTag = useCallback(e => {
        setActiveTag("todo");
    }, [setActiveTag]);

    const onClickStatTag = useCallback(e => {
        setActiveTag("stat");
    }, [setActiveTag]);

    const onClickNoteTag = useCallback(e => {
        setActiveTag("note");
    }, [setActiveTag]);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    return (
        <>
            <TodoContent>
                <THeaderFrame>
                    <THeaderBlock>
                        <THeaderLongBox>
                            <THeaderDaySpan>
                                {`${selectedDate.getFullYear()} . ${selectedDate.getMonth()+1} . ${selectedDate.getDate()}`}
                            </THeaderDaySpan>
                        </THeaderLongBox>
                        <THeaderSmallBox>

                        </THeaderSmallBox>
                    </THeaderBlock>
                    <THeaderBlock>
                        <THeaderLongBox>

                        </THeaderLongBox>
                        <THeaderSmallBox>
                            
                        </THeaderSmallBox>
                    </THeaderBlock>
                </THeaderFrame>
                <TContentFrame>

                </TContentFrame>
            </TodoContent>
        </>
    );
}

export default Todo;