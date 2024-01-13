import { useMutation } from "@tanstack/react-query";
import * as authAPI from '../../lib/api/authAPI';

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: authAPI.register
    })
};