import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../lib/api/calAPI';

export const useGetTodosByDayQuery = (date) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTodosByDay", {date: date}],
        queryFn: () => calAPI.getTodosByDay(date),
        select: (res) => res?.data
    });

    return { isPending, data }
}