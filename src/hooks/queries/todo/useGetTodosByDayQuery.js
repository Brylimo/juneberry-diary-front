import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../../lib/api/calAPI';

export const useGetTodosByDayQuery = (year, month, day) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTodosByDay", {year: year, month: month, day: day}],
        queryFn: () => calAPI.getTodosByDay(year, month, day),
        select: (res) => res?.data
    });

    return { isPending, data }
}