import { useMutation } from "@tanstack/react-query";
import * as userAPI from '../../../lib/api/userAPI';

export const useVerifyCodeMutation = () => {
    return useMutation({
        mutationFn: userAPI.verifyCode,
        retry: 0
    })
}