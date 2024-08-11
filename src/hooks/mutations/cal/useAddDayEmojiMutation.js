import { useMutation } from "@tanstack/react-query";
import * as calAPI from '../../../lib/api/calAPI';

export const useAddDayEmojiMutation = () => {
    return useMutation({
        mutationFn: calAPI.addDayEmoji
    })
};