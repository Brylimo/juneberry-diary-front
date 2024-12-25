import { useMutation } from "@tanstack/react-query";
import * as tokenAPI from '../../../lib/api/tokenAPI';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: tokenAPI.login
    })
};