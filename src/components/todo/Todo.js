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
    background-color: rgba(255, 225, 255, 0.3);
    padding: 1rem;
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
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    return (
        <>
            <Tags>
                <Tag kind={"todo"}></Tag>
                <Tag kind={"stat"}></Tag>
                <Tag kind={"note"}></Tag>
            </Tags>
            <TodoContent>
                <THeaderFrame>
                    <THeaderFrameSpan>{monthNames[selectedDate.getMonth()]}</THeaderFrameSpan>
                    <THeaderFrameSpan>{selectedDate.getDate()}</THeaderFrameSpan>
                </THeaderFrame>
                <TContentFrame>

                </TContentFrame>
            </TodoContent>
        </>
    );
}

export default Todo;