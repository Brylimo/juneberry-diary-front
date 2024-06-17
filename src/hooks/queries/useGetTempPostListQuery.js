import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../lib/api/postAPI';

export const useGetTempPostListQuery = (page) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTempPostList", page * 10],
        queryFn:() => postAPI.getTempPostList(page * 10),
        select: res => res?.data
    })

    return { isPending, data }
}