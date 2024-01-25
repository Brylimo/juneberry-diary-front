import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useGetTodosByDayQuery } from '../../hooks/queries/useGetTodosByDayQuery';
import Todo from '../../components/todo/Todo';
import { storeTodos } from '../../modules/todo';

const TodoForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const {isPending: isTodosPending, data: todoList} = useGetTodosByDayQuery(selectedDate);

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
        }
    }, [todoList, dispatch]);

    return <Todo selectedDate={selectedDate} />;
}

export default TodoForm;