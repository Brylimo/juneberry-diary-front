import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import TodoLine from '../../components/todo/TodoLine';

const TodoLineForm = ({ index, selectedDate }) => {
    const { todoHash } = useSelector(({ todo }) => ({
        todoHash: todo.todoHash
    }));

    console.log(todoHash[index])

    return <TodoLine index={index} selectedDate={selectedDate} />
}

export default TodoLineForm;