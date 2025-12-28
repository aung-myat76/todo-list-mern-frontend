import { useRef, type FC } from "react";
import useHttp from "../hooks/useHttp";
import { type ReqType } from "./AddTodo";

export type TodoType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoAction = {
    updateTodo: (id: string, todo: TodoType) => void;
    deleteTodo: (id: string) => void;
};

const Todo: FC<TodoType & TodoAction> = ({
    id,
    title,
    isDone,
    updateTodo,
    deleteTodo
}) => {
    const isDoneRef = useRef<HTMLInputElement | null>(null);
    const { sendReq } = useHttp<ReqType>();

    const handleIsDone = async () => {
        const isChecked = isDoneRef.current?.checked ? true : false;
        const updatedTodo = { id, title, isDone: isChecked };
        // console.log(updatedTodo);

        const data = await sendReq("http://localhost:5000/api/todos", {
            method: "PUT",
            body: {
                todo: updatedTodo
            }
        });
        const todo = await data.todo;
        console.log(todo);
        updateTodo(id, updatedTodo);
    };

    const handleDeleteTodo = async (id: string) => {
        if (!confirm("Are you sure to Delete?")) {
            return;
        }

        const data = await sendReq("http://localhost:5000/api/todos", {
            method: "DELETE",
            body: {
                todoId: id
            }
        });

        if (data) {
            deleteTodo(id);
        }
    };

    return (
        <div id={id}>
            <input
                ref={isDoneRef}
                onChange={handleIsDone}
                id={id}
                name="isDone"
                type="checkbox"
                checked={isDone}
                value={id}
            />
            <label htmlFor={id}>{title}</label>
            <button onClick={() => handleDeleteTodo(id)}>Remove</button>
        </div>
    );
};

export default Todo;
