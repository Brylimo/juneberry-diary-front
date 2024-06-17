import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../lib/api/postAPI';

export const useGetTempPostCntQuery = () => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTempPostCnt"],
        queryFn:() => postAPI.getTempPostCnt(),
        select: (res) => res?.data
    });

    return { isPending, data }
}