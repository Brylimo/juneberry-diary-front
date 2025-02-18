import { useMutation } from "@tanstack/react-query";
import * as calAPI from '../../../lib/api/calAPI';

export const useUpdateTodoMutation = () => {
    return useMutation({
        mutationFn: calAPI.updateTodo
    })
};