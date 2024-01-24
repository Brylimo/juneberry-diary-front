import { useMutation } from "@tanstack/react-query";
import * as calAPI from '../../lib/api/calAPI';

export const useAddOneTodoMutation = () => {
    return useMutation({
        mutationFn: calAPI.addOneTodo
    })
};