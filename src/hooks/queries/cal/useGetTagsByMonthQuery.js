import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../../lib/api/calAPI';

export const useGetTagsByMonthQuery = (year, month) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTagsByMonth", {year: year, month: month}],
        queryFn: () => calAPI.getTagsByMonth(year, month),
        select: (res) => res?.data
    });

    return { isPending, data }
}