import { useQuery } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useGetAllBlogs = () => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getAllBlogs"],
        queryFn:() => blogAPI.getAllBlogs(),
        select: (res) => res?.data
    });

    return { isPending, data }
}