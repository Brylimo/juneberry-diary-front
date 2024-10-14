import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetPostQuery = (blogId, id, enabled) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getPost", {blogId: blogId, id: id}],
        queryFn:() => postAPI.getPost(blogId, id),
        select: (res) => res?.data,
        enabled: enabled
    });

    return { isPending, data }
}