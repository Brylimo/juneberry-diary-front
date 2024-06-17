import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../lib/api/postAPI';

export const useGetTempPostListQuery = (page, size) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTempPostList", [page, size]],
        queryFn:() => postAPI.getTempPostList(page, size),
        select: res => res?.data
    })

    return { isPending, data }
}