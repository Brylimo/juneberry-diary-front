import React from "react";
import CalendarGrid from "../../components/cal/CalendarGrid";
import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../lib/api/calAPI';

const CalendarBody = ({ currentMonth, selectedDate, setSelectedDate }) => {
    const { isPending, data } = useQuery({
        queryKey: ["getTagsByMonth", {year: currentMonth.getFullYear(), month: currentMonth.getMonth() + 1}],
        queryFn: () => calAPI.getTagsByMonth(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    });

    if (!isPending) {
        console.log("jkjk", data)
    }

    return (
        <CalendarGrid currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    );
}

export default CalendarBody;