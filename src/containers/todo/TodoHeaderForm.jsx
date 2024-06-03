import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import useDebounce from '../../hooks/useDebounce';
import { useUpdateTodayTxtMutation } from '../../hooks/mutations/useUpdateTodayTxtMutation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import TodoHeader from '../../components/todo/TodoHeader';
import { storeTodayTxt } from '../../modules/todo';

const TodoHeaderForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const { todayTxt } = useSelector(({ todo }) => ({
        todayTxt: todo.todayTxt
    }))

    const [todayText, setTodayText] = useState('');
    const [pendingActive, setPendingActive] = useState(true);
    const [focusActive, setFocusActive] = useState(false);
    const [isPending, debouncedValue] = useDebounce(todayText, 1000);
    const { mutate: updateTodayTxtMutate, isPending: apiPending } = useUpdateTodayTxtMutation();
    const queryClient = useQueryClient();

    const onFocusTodayTxtInput = useCallback(() => {
        setPendingActive(true);
        setFocusActive(true);
    }, [])

    useEffect(() => {
        if (focusActive) {
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
                        dispatch(
                            storeTodayTxt({
                                todayTxt: res?.data?.todayTxt
                            })
                        )
                    },
                    onError: () => {
                        toast.error("오늘의 한마디 저장에 실패했습니다.");
                        return;
                    }
                }
            )
        }
        if (!pendingActive) setPendingActive(true)
        return () => setFocusActive(false)
    }, [debouncedValue])

    useEffect(() => {
        if (!focusActive || !todayTxt || ((isPending || apiPending) && pendingActive)) {
            setTodayText(todayTxt || '')
            setPendingActive(false)
            if (isPending && pendingActive) {
                setFocusActive(false)
            }
        }
    }, [todayTxt])

    useEffect(() => {
        setTodayText(todayTxt || '')
        setPendingActive(false)
        if (isPending && pendingActive) {
            setFocusActive(false)
        }
    }, [selectedDate])

    return <TodoHeader 
        selectedDate={selectedDate}
        isTyping={(isPending || apiPending) && pendingActive}
        todayText={todayText}
        onFocusTodayTxtInput={onFocusTodayTxtInput}
        setTodayText={setTodayText}
    />
}

export default TodoHeaderForm;