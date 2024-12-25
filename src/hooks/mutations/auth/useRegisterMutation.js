import { useMutation } from "@tanstack/react-query";
import * as tokenAPI from '../../../lib/api/tokenAPI';

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: tokenAPI.register
    })
};