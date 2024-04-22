import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useGetTodosByDayQuery } from '../../hooks/queries/useGetTodosByDayQuery';
import Todo from '../../components/todo/Todo';
import { storeTodos } from '../../modules/todo';
import { useQueryClient } from '@tanstack/react-query';

const TodoForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const {isPending: isTodosPending, data: todoList} = useGetTodosByDayQuery(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate());

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
            queryClient.removeQueries({
                queryKey : ["getTodosByDay", {year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate()}]
            });
        }
    }, [todoList, dispatch]);

    return <Todo selectedDate={selectedDate} />;
}

export default TodoForm;