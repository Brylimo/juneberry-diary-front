import { useQuery } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useGetAllCategories = (blogId) => {
    const {
        isPending,
        isFetching,
        data
    } = useQuery({
        queryKey: ["getAllCategories", {blogId: blogId}],
        queryFn:() => blogAPI.getAllCategories({ blogId }),
        select: (res) => res?.data,
    });

    return { isPending, isFetching, data }
}
