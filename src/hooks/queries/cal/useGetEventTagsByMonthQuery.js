import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../../lib/api/calAPI';

export const useGetEventTagsByMonthQuery = (year, month) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getEventTagsByMonth", {year: year, month: month}],
        queryFn: () => calAPI.getEventTagsByMonth(year, month),
        select: (res) => res?.data
    });

    return { isPending, data }
}