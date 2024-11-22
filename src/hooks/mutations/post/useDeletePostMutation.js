import { useMutation } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useDeletePostMutation = () => {
    return useMutation({
        mutationFn: postAPI.deletePost
    })
}