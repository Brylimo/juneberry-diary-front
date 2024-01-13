import React, { useCallback, useState } from 'react';
import styled, { css } from "styled-components";

const Tags = styled.div`
    height: 4rem;
    background-color: transparent;
    display: flex;
    flex-direction: row;
`;

const Tag = styled.div`
    height: 100%;
    width: calc(100% / 6);
    border-radius: 2rem 2rem 0 0;
    cursor: pointer;

    ${props => props.kind === "todo" && css`
        background-color: rgba(255, 225, 255, 0.3);
    `};

    ${props => props.kind === "stat" && css`
        background-color: rgba(173, 216, 173, 0.3);
    `};

    ${props => props.kind === "note" && css`
        background-color: rgba(255, 255, 0, 0.3);
    `};
`;

const TodoContent = styled.div`
    width: 100%;
    height: calc(100% - 4rem);
    padding: 1rem;

    ${props =>
        props.activeTag === "todo" &&
        css`
            background-color: rgba(255, 225, 255, 0.3);
        `
    }

    ${props =>
        props.activeTag === "stat" &&
        css`
            background-color: rgba(173, 216, 173, 0.3);
        `
    }

    ${props =>
        props.activeTag === "note" &&
        css`
            background-color: rgba(255, 255, 0, 0.3);
        `
    }
`;

const THeaderFrame = styled.div`
    margin-bottom: 0.5rem;
`;

const THeaderFrameSpan = styled.span`
    font-size: 3rem;
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
            <Tags>
                <Tag kind={"todo"} onClick={onClickTodoTag}></Tag>
                <Tag kind={"stat"} onClick={onClickStatTag}></Tag>
                <Tag kind={"note"} onClick={onClickNoteTag}></Tag>
            </Tags>
            <TodoContent activeTag={activeTag}>
                {
                    activeTag === "todo" && 
                    (<>
                        <THeaderFrame>
                            <THeaderFrameSpan>{monthNames[selectedDate.getMonth()]} </THeaderFrameSpan>
                            <THeaderFrameSpan>{selectedDate.getDate()}</THeaderFrameSpan>
                        </THeaderFrame>
                        <TContentFrame>

                        </TContentFrame>
                    </>)
                }
            </TodoContent>
        </>
    );
}

export default Todo;