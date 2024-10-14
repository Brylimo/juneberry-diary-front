import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetTempPostCntQuery = (enabled, blogId) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTempPostCnt"],
        queryFn:() => postAPI.getTempPostCnt(blogId),
        select: (res) => res?.data,
        enabled: enabled
    });

    return { isPending, data }
}