import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetPostByIndexQuery = (blogId, index) => {
    const {
        isLoading,
        isFetching,
        data
    } = useQuery({
        queryKey: ["getPostByIndex", {blogId: blogId, index: index}],
        queryFn: () => postAPI.getPostByIndex(blogId, index),
        select: (res) => res?.data
    });

    return { isLoading, isFetching, data }
}