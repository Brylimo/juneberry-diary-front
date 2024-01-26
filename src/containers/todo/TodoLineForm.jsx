import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import TodoLine from '../../components/todo/TodoLine';
import { useAddOneTodoMutation } from '../../hooks/mutations/useAddOneTodoMutation';
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
    const [chkValue, setChkValue] = useState(null);
    const [tempTodo, setTempTodo] = useState({});
    const [lineGroupTxt, setLineGroupTxt] = useState('');
    const [lineContentTxt, setLineContentTxt] = useState('');

    const debouncedValue = useDebounce(lineGroupTxt + lineContentTxt, 2000);
    const queryClient = useQueryClient();
    const { mutate: addOneTodoMutate } = useAddOneTodoMutation();

    const onFocusTodoInput = useCallback(() => {
        setFocusActive(true);
    }, []);

    const onClickTodoLineCheck = useCallback(() => {
        if (lineActive) {
            setChkActive(true);
        }
    }, [lineActive]);

    useEffect(() => {
        if (debouncedValue && focusActive) {
            addOneTodoMutate(
                {
                    selectedDate,
                    groupName: lineGroupTxt,
                    content: lineContentTxt,
                    position: index,
                    doneCd: chkValue === 'O' ? true : false
                },
                {
                    onSuccess: (res) => {
                        dispatch(
                            changeTodo({
                                key: res?.position,
                                value: res?.data
                            })
                        )
                        queryClient.invalidateQueries(["getTodosByDay"]);
                    },
                    onError: () => {
                        toast.error("todo 저장에 실패했습니다.");
                        return;
                    }
                }
            )
        }
        return () => setFocusActive(false)
    }, [debouncedValue, addOneTodoMutate]);

    useEffect(() => {
        if (!focusActive || !todo) {
            setLineGroupTxt(todo?.groupName || '');
            setLineContentTxt(todo?.content || '');
        }
        setTempTodo(todo);
    }, [todo]);

    useEffect(() => {
        if (lineGroupTxt || lineContentTxt) {
            setLineActive(true);
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

    return <TodoLine 
        chkActive={chkActive}
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