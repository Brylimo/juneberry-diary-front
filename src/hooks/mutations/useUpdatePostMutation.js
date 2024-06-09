import { useMutation } from "@tanstack/react-query";
import * as postAPI from '../../lib/api/postAPI';

export const useUpdatePostMutation = () => {
    return useMutation({
        mutationFn: postAPI.updatePost
    })
}