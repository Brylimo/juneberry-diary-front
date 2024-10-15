import { useQuery } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useGetPostListQuery = ({blogId, isTemp, isPublic, page, size}) => {
    const {
        isPending,
        isFetching,
        isLoading,
        data
    } = useQuery({
        queryKey: ["getPostList", [blogId, page, size]],
        queryFn:() => postAPI.getPostList({blogId, isTemp, isPublic, page, size}),
        select: res => res?.data
    })

    return { isPending, isFetching, isLoading, data }
}