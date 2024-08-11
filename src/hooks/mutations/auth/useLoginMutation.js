import { useMutation } from "@tanstack/react-query";
import * as authAPI from '../../../lib/api/authAPI';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: authAPI.login
    })
};