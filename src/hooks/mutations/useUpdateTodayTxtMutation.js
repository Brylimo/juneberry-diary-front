import { useMutation } from "@tanstack/react-query";
import * as calAPI from '../../lib/api/calAPI';

export const useUpdateTodayTxtMutation = () => {
    return useMutation({
        mutationFn: calAPI.updateTodayTxt
    })
};