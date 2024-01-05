import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from './../../modules/cal';
import CalendarGrid from "../../components/cal/CalendarGrid";

const CalendarBody = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const dispatch = useDispatch();

    const { tags } = useSelector(({ cal }) => ({
        tags: cal.tags
    }));

    useEffect(() => {
        dispatch(getTags(currentMonth.getFullYear(), currentMonth.getMonth()));
    }, [currentMonth, dispatch]);

    useEffect(() => {
        console.log("kkkkk", tags);
    }, [tags]);

    return (
        <CalendarGrid currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    );
}

export default CalendarBody;