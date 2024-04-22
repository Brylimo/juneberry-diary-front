import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../lib/api/calAPI';

export const useGetTodayTxtQuery = (selectedDate) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTodayTxt", {selectedDate: selectedDate}],
        queryFn: () => calAPI.getTodayTxt(selectedDate),
        select: (res) => res?.data
    });

    return { isPending, data }
}