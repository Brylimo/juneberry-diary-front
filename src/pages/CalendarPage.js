import { useCallback, useState } from "react";
import styled from "styled-components";
import CalendarHeader from "../components/cal/CalendarHeader";
import CalendarBody from "../components/cal/CalendarBody";
import Todo from "../components/todo/Todo";
import { addMonths, subMonths } from "date-fns";

const FrameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 8rem);
    position: absolute;
    top: 8rem;
`;

const CFrame = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CalendarFrame = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
`;

const TFrame = styled.div`
    flex: 1;
    padding: 3rem;
`;

const CalendarPage = () => {
    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState(new Date());

    const prevMonth = useCallback(() => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }, [currentMonth]);
    const nextMonth = useCallback(() => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }, [currentMonth]);

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <FrameWrapper>
                <CFrame>
                    <CalendarFrame>
                        <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
                        <CalendarBody currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </CalendarFrame>
                </CFrame>
                <TFrame>
                    <Todo selectedDate={selectedDate} />
                </TFrame>
            </FrameWrapper>
        </div>
    );
}

export default CalendarPage;