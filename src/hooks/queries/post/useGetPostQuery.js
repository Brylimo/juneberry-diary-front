import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetPostQuery = (id, enabled) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getPost", {id: id}],
        queryFn:() => postAPI.getPost({ id }),
        select: (res) => res?.data,
        enabled: enabled
    });

    return { isPending, data }
}