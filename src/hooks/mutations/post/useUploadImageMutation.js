import { useMutation } from "@tanstack/react-query";
import * as postAPI from '../../../lib/api/postAPI';

export const useUploadImageMutation = () => {
    return useMutation({
        mutationFn: postAPI.uploadImg
    })
}