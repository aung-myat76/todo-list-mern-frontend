import { useRef, useState, type FC } from "react";
import useHttp from "../hooks/useHttp";
import { type ReqType } from "./AddTodo";
import { motion } from "framer-motion";
import Modal from "./Modal";

import TrashIcon from "../assets/trash.svg?react";

export type TodoType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoAction = {
    updateTodo: (id: string, todo: TodoType) => void;
    deleteTodo: (id: string) => void;
};

const baseURL = import.meta.env.VITE_API_URL;

const Todo: FC<TodoType & TodoAction> = ({
    id,
    title,
    isDone,
    updateTodo,
    deleteTodo
}) => {
    const isDoneRef = useRef<HTMLInputElement | null>(null);
    const [checked, setChecked] = useState(false);
    const { sendReq } = useHttp<ReqType>();
    const [isOpen, setIsOpen] = useState(false);

    const todoVariants = {
        unchecked: {
            opacity: 1,
            textDecoration: "none"
        },
        checked: {
            opacity: 0.5,
            textDecoration: "line-through"
        }
    };

    const handleIsDone = async () => {
        const isChecked = isDoneRef.current?.checked ? true : false;
        setChecked(isChecked);
        // console.log(updatedTodo);

        const data = await sendReq(
            baseURL || "http://localhost:5000" + "/api/todos",
            {
                method: "PUT",
                body: {
                    todoId: id,
                    isDone: isChecked
                }
            }
        );
        const todo = await data.todo;
        console.log(todo);
        if (todo) {
            updateTodo(todo.id, todo);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        const data = await sendReq(
            baseURL || "http://localhost:5000" + "/api/todos",
            {
                method: "DELETE",
                body: {
                    todoId: id
                }
            }
        );

        if (data.todoId) {
            deleteTodo(data.todoId);
        }
    };

    const handleDeleteConfirm = () => {
        handleDeleteTodo(id);
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Deleting...">
                <p>Are you sure to delete this?</p>
            </Modal>
            <li id={id}>
                <div>
                    <motion.input
                        ref={isDoneRef}
                        onChange={handleIsDone}
                        id={id}
                        name="isDone"
                        type="checkbox"
                        checked={isDone}
                        value={id}
                        whileHover={{ scale: 1.25, rotate: 45 }}
                        whileTap={{ scale: 1.25, rotate: 45 }}
                    />

                    <motion.label
                        variants={todoVariants}
                        animate={checked || isDone ? "checked" : "unchecked"}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            duration: 1
                        }}
                        htmlFor={id}>
                        {title.length > 25 ? title.slice(0, 25) + "..." : title}
                    </motion.label>
                </div>
                <TrashIcon
                    onClick={() => setIsOpen(true)}
                    // onClick={() => handleDeleteTodo(id)}
                    className="trash-icon"
                    style={{
                        color: "red",
                        width: "15px",
                        height: "15px"
                    }}
                />
            </li>
        </>
    );
};

export default Todo;
