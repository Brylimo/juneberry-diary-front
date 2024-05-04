import { useQuery } from "@tanstack/react-query";
import * as calAPI from '../../lib/api/calAPI';

export const useGetEmojisByMonthQuery = (year, month) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getEmojisByMonth", {year: year, month: month}],
        queryFn: () => calAPI.getEmojisByMonth(year, month),
        select: (res) => res?.data
    });

    return { isPending, data }
}