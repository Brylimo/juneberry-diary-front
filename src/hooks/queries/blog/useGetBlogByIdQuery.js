import { useQuery } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useGetBlogByIdQuery = (id, apiEnabled) => {
    const {
        isPending,
        isFetching,
        data
    } = useQuery({
        queryKey: ["getBlogById", {id: id}],
        queryFn:() => blogAPI.getBlogById(id),
        select: (res) => res?.data,
        enabled: apiEnabled
    });

    return { isPending, isFetching, data }
}