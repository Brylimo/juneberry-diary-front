import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetTempPostListQuery = (blogId, page, size) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTempPostList", [blogId, page, size]],
        queryFn:() => postAPI.getTempPostList(blogId, page, size),
        select: res => res?.data
    })

    return { isPending, data }
}