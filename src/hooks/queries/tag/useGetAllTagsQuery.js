import { useQuery } from "@tanstack/react-query";
import * as tagAPI from '../../../lib/api/tagAPI';

export const useGetAllTagsQuery = ({blogId}) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getAllTags", {blogId: blogId}],
        queryFn: () => tagAPI.getAllTags(blogId),
        select: (res) => res?.data
    });

    return { isPending, data }
}