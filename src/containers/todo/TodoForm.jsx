import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useGetTodosByDayQuery } from '../../hooks/queries/todo/useGetTodosByDayQuery';
import { useGetTodayTxtQuery } from '../../hooks/queries/todo/useGetTodayTxtQuery';
import Todo from '../../components/todo/Todo';
import { storeTodayTxt, storeTodos } from '../../modules/todo';
import { useQueryClient } from '@tanstack/react-query';

const TodoForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { data: todoList } = useGetTodosByDayQuery(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate());
    const { data: todayTxtData } = useGetTodayTxtQuery(selectedDate);

    useEffect(() => {
        if (todoList) {
            let todoHash = {};
            todoList.forEach(todo => {
                todoHash[todo.position] = todo
            });

            dispatch(
                storeTodos({
                    todoHash: todoHash
                })
            )
            queryClient.invalidateQueries({
                queryKey : ["getTodosByDay", {year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate()}]
            });
        }
        if (todayTxtData) {
            dispatch(
                storeTodayTxt({
                    todayTxt: todayTxtData?.todayTxt
                })
            )
        }
    }, [todoList, todayTxtData, dispatch]);

    return <Todo selectedDate={selectedDate} />;
}

export default TodoForm;