import { useQuery } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useGetAllTagsQuery = ({ blogId }) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getAllTags", {blogId: blogId}],
        queryFn: () => blogAPI.getAllTags({ blogId }),
        select: (res) => res?.data
    });

    return { isPending, data }
}