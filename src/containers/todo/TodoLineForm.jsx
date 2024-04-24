import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import TodoLine from '../../components/todo/TodoLine';
import { useAddOneTodoMutation } from '../../hooks/mutations/useAddOneTodoMutation';
import { useUpdateTodoChkMutation } from '../../hooks/mutations/useUpdateTodoChkMutation';
import useDebounce from './../../hooks/useDebounce';
import { changeTodo } from '../../modules/todo';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const TodoLineForm = ({ index, selectedDate }) => {
    const dispatch = useDispatch();
    const { todoHash: { [index]: todo } } = useSelector(({ todo }) => ({
        todoHash: todo.todoHash
    }));

    const [chkActive, setChkActive] = useState(false);
    const [lineActive, setLineActive] = useState(false);
    const [focusActive, setFocusActive] = useState(false);
    const [pendingActive, setPendingActive] = useState(true);
    const [stopActive, setStopActive] = useState(false);
    const [chkValue, setChkValue] = useState(null);
    const [lineGroupTxt, setLineGroupTxt] = useState('');
    const [lineContentTxt, setLineContentTxt] = useState('');
    const [prevTodo, setPrevTodo]= useState(undefined);

    const [isPending, debouncedValue] = useDebounce(lineGroupTxt + lineContentTxt, 2000);
    const queryClient = useQueryClient();
    const { mutate: addOneTodoMutate, isPending: apiPending } = useAddOneTodoMutation();
    const { mutate: updateTodoChkMutate } = useUpdateTodoChkMutation();

    const onFocusTodoInput = useCallback(() => {
        setPendingActive(true);
        setFocusActive(true);
    }, []);

    const onClickTodoLineCheck = useCallback(() => {
        if (lineActive) {
            setChkActive(true);
        }
    }, [lineActive]);

    useEffect(() => {
        if (debouncedValue && focusActive && !stopActive) {
            let chkNum = 0
            if (chkValue === 'O') {
                chkNum = 1
            } else if (chkValue === 'X') {
                chkNum = 2
            }

            addOneTodoMutate(
                {
                    selectedDate,
                    groupName: lineGroupTxt,
                    content: lineContentTxt,
                    position: index,
                    chk: chkNum
                },
                {
                    onSuccess: (res) => {
                        const resDate = new Date(res.data.date)
                        queryClient.removeQueries({
                            queryKey : ["getTodosByDay", {year: resDate.getFullYear(), month: resDate.getMonth() + 1, day: resDate.getDate()}]
                        });
                        dispatch(
                            changeTodo({
                                key: res?.position,
                                value: res?.data
                            })
                        )
                    },
                    onError: () => {
                        toast.error("todo 저장에 실패했습니다.");
                        return;
                    }
                }
            )
        }
        if (stopActive) {
            setStopActive(false);
            toast.error("todo 저장에 실패했습니다.");
        }
        if (!pendingActive) setPendingActive(true)
        return () => setFocusActive(false)
    }, [debouncedValue, addOneTodoMutate]);

    useEffect(() => {
        if (!focusActive || !todo || ((isPending || apiPending) && pendingActive)) {
            setLineGroupTxt(todo?.groupName || '');
            setLineContentTxt(todo?.content || '');
            setPendingActive(false)

            // todo
            if (isPending && pendingActive) {
                setStopActive(true);
                setFocusActive(false);
            }
        }
        setPrevTodo(todo);
    }, [todo]);

    useEffect(() => {
        if (lineGroupTxt || lineContentTxt) {
            setLineActive(true);
        } else if (todo) {
            setLineActive(true);
            // 따로처리
        } else {
            setLineActive(false);
        }
    }, [lineGroupTxt, lineContentTxt]);

    useEffect(() => {
        if (!lineActive) {
            setLineGroupTxt('');
            setLineContentTxt('');
            setChkValue('')
        }
    }, [lineActive]);

    useEffect(() => {
        // 만들어지지 않은 라인 날짜 바꾼 경우
        if (lineActive && !todo && prevTodo === todo) {
            setLineGroupTxt(todo?.groupName || '');
            setLineContentTxt(todo?.content || '');
            setPendingActive(false)
            if (isPending && pendingActive) {
                setStopActive(true);
                setFocusActive(false);
            }
        }
    }, [selectedDate])

    useEffect(() => {
        if (chkValue) {
            let chkNum = 0
            if (chkValue === 'O') {
                chkNum = 1
            } else if (chkValue === 'X') {
                chkNum = 2
            }
            
            updateTodoChkMutate(
                {
                    selectedDate,
                    position: index,
                    chk: chkNum
                },
                {
                    onSuccess: (res) => {
                        
                    },
                    onError: () => {
                        toast.error("check 저장에 실패했습니다.");
                        return;
                    }
                }
            )
        }
    }, [chkValue])

    return <TodoLine 
        chkActive={chkActive}
        isTyping={(isPending || apiPending) && pendingActive}
        chkValue={chkValue}
        lineActive={lineActive}
        lineGroupTxt={lineGroupTxt}
        lineContentTxt={lineContentTxt} 
        onClickTodoLineCheck={onClickTodoLineCheck}
        onFocusTodoInput={onFocusTodoInput}
        setChkActive={setChkActive}
        setLineActive={setLineActive}
        setChkValue={setChkValue}
        setLineGroupTxt={setLineGroupTxt}
        setLineContentTxt={setLineContentTxt}
    />
}

export default TodoLineForm;