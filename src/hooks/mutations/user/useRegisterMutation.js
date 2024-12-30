import { useMutation } from "@tanstack/react-query";
import * as userAPI from '../../../lib/api/userAPI';

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: userAPI.register
    })
};