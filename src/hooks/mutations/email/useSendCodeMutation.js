import { useMutation } from "@tanstack/react-query";
import * as emailAPI from '../../../lib/api/emailAPI';

export const useSendCodeMutation = () => {
    return useMutation({
        mutationFn: emailAPI.sendCode
    })
}