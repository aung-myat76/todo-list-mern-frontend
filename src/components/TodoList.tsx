import type { FC } from "react";
import Todo, { type TodoType } from "./Todo";

type TodoListType = {
    todos: TodoType[];
    updateTodo: (id: string, todo: TodoType) => void;
    deleteTodo: (id: string) => void;
};

const TodoList: FC<TodoListType> = ({ todos, updateTodo, deleteTodo }) => {
    return (
        <ul id="todo-list">
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isDone={todo.isDone}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
};

export default TodoList;
