import { useMutation } from "@tanstack/react-query";
import * as calAPI from '../../../lib/api/calAPI';

export const useUpdateTodoChkMutation = () => {
    return useMutation({
        mutationFn: calAPI.updateTodoChk
    })
};