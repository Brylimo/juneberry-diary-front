import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import useDebounce from '../../hooks/useDebounce';
import { useUpdateTodayTxtMutation } from '../../hooks/mutations/useUpdateTodayTxtMutation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import TodoHeader from '../../components/todo/TodoHeader';

const TodoHeaderForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const { todayTxt } = useSelector(({ todo }) => ({
        todayTxt: todo.todayTxt
    }))

    const [todayText, setTodayText] = useState('');
    const [pendingActive, setPendingActive] = useState(true);
    const [isPending, debouncedValue] = useDebounce(todayText, 1000);
    const { mutate: updateTodayTxtMutate, isPending: apiPending } = useUpdateTodayTxtMutation();
    const queryClient = useQueryClient();

    const onFocusTodoInput = useCallback(() => {
        setPendingActive(true);
    }, [])

    useEffect(() => {
        updateTodayTxtMutate(
            {
                selectedDate,
                todayTxt: debouncedValue
            },
            {
                onSuccess: (res) => {
                    queryClient.invalidateQueries({
                        queryKey : ["getTodayTxt", {selectedDate}]
                    })
                },
                onError: () => {
                    toast.error("글 저장에 실패했습니다.");
                    return;
                }
            }
        )
    }, [debouncedValue])

    useEffect(() => {
        setTodayText(todayTxt)
    }, [todayTxt])

    return <TodoHeader 
        selectedDate={selectedDate}
        isTyping={(isPending || apiPending) && pendingActive}
        todayText={todayText}
        onFocusTodoInput={onFocusTodoInput}
        setTodayText={setTodayText}
    />
}

export default TodoHeaderForm;