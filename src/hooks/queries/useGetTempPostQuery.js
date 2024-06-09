import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../lib/api/postAPI';

export const useGetTempPostQuery = (id, enabled) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getTempPost", {id: id}],
        queryFn:() => postAPI.getTempPost(id),
        select: (res) => res?.data,
        enabled: enabled
    });

    return { isPending, data }
}