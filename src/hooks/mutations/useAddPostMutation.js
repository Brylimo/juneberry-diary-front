import { useMutation } from "@tanstack/react-query";
import * as postAPI from '../../lib/api/postAPI';

export const useAddPostMutation = () => {
    return useMutation({
        mutationFn: postAPI.addPost
    })
}