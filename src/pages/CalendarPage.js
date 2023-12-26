import { useCallback, useState } from "react";
import styled from "styled-components";
import CalendarHeader from "../components/cal/CalendarHeader";
import CalendarBody from "../components/cal/CalendarBody";
import { addMonths, subMonths } from "date-fns";

const Frame = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4.8rem;
`;

const CalendarFrame = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 235, 255, 0.7);
    padding: 1rem 2rem;
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
        <Frame>
            <CalendarFrame>
                <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
                <CalendarBody currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </CalendarFrame>

        </Frame>
    );
}

export default CalendarPage;