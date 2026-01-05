import { useRef, type FormEvent, type FC } from "react";

import useHttp from "../hooks/useHttp";
import { type TodoType } from "./Todo";
import AnimatedBtn from "./AnimateBtn";

const baseURL = import.meta.env.VITE_API_URL;

type AddTodoType = {
    onAdd: (todo: TodoType) => void;
};

export type ReqType = {
    message: string;
    todo?: TodoType;
    todoId?: string;
};

const AddTodo: FC<AddTodoType> = ({ onAdd }) => {
    const { sendReq, httpState } = useHttp<ReqType>();
    const titleRef = useRef<HTMLInputElement | null>(null);

    const handleAddTodo = async (e: FormEvent) => {
        e.preventDefault();

        const data = await sendReq(
            baseURL || "http://localhost:5000" + "/api/todos",
            {
                method: "POST",
                body: {
                    title: titleRef.current?.value
                }
            }
        );
        if (data.todo) {
            onAdd(data.todo);
        }
        titleRef!.current!.value = "";
    };

    return (
        <div className="container" id="add-form">
            <form>
                <input
                    placeholder="write 5 - 50 letters"
                    name="title"
                    ref={titleRef}
                />
                <AnimatedBtn onClick={handleAddTodo}>Add</AnimatedBtn>
            </form>
            {httpState.error && <p className="error">{httpState.error}</p>}
        </div>
    );
};

export default AddTodo;
