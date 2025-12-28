import { useRef, type FormEvent, type FC } from "react";
import useHttp from "../hooks/useHttp";
import { type TodoType } from "./Todo";

type AddTodoType = {
    onAdd: (todo: TodoType) => void;
};

export type ReqType = {
    message: string;
    todos: TodoType[];
    todo?: TodoType;
};

const AddTodo: FC<AddTodoType> = ({ onAdd }) => {
    const { sendReq } = useHttp<ReqType>();
    const titleRef = useRef<HTMLInputElement | null>(null);

    const handleAddTodo = async (e: FormEvent) => {
        e.preventDefault();

        const data = await sendReq("http://localhost:5000/api/todos", {
            method: "POST",
            body: {
                title: titleRef.current?.value
            }
        });
        if (data.todo) {
            onAdd(data.todo);
        }
        titleRef!.current!.value = "";
        // onAdd({
        //     title: titleRef.current!.value,
        //     id: Math.random().toString(),
        //     isDone: false,
        // });
    };

    return (
        <div>
            <form>
                <input name="title" ref={titleRef} />
                <button onClick={handleAddTodo}>Add</button>
            </form>
        </div>
    );
};

export default AddTodo;
