import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetPostListQuery = ({blogId, tagName, isTemp, isPublic, page, size}) => {
    const {
        isPending,
        isFetching,
        isLoading,
        data
    } = useQuery({
        queryKey: ["getPostList", [blogId, tagName, page, size]],
        queryFn:() => postAPI.getPostList({blogId, tagName, isTemp, isPublic, page, size}),
        select: res => res?.data
    })

    return { isPending, isFetching, isLoading, data }
}