import { useQuery } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useGetAllBlogsByUser = () => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getAllBlogsByUser"],
        queryFn:() => blogAPI.getAllBlogsByUser(),
        select: (res) => res?.data
    });

    return { isPending, data }
}