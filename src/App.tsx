import { useEffect, useState } from "react";
import Header from "./components/Header";
import useHttp from "./hooks/useHttp";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { type TodoType } from "./components/Todo";

import "./App.css";

const baseURL = import.meta.env.VITE_API_URL;

const App = () => {
    const { httpState, sendReq } = useHttp<{
        todos: TodoType[];
        message: string;
    }>();
    const { isLoading, data, error } = httpState;
    const [todos, setTodos] = useState<TodoType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await sendReq(
                    baseURL || "http://localhost:5000/api/todos"
                );
                if (data) {
                    setTodos(data.todos);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [sendReq]);

    console.log(todos);

    const addTodo = (todo: TodoType) => {
        setTodos((preTodos) => {
            return [...preTodos, todo];
        });
    };

    const updateTodo = (id: string, todo: TodoType) => {
        setTodos((preTodos) => {
            const updatedTodos = [...preTodos];
            const todoIndex = updatedTodos.findIndex((t) => t.id === id);
            updatedTodos[todoIndex] = todo;
            return updatedTodos;
        });
    };

    const deleteTodo = (id: string) => {
        setTodos((preTodos) => {
            const updatedTodos = preTodos.filter((t) => t.id !== id);
            return updatedTodos;
        });
    };

    return (
        <>
            <Header>To do list</Header>
            <AddTodo onAdd={addTodo} />
            {isLoading && <p className="container">Loading...</p>}
            {!isLoading && data && todos.length > 0 && (
                <TodoList
                    todos={todos}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            )}
            {!isLoading && error && <p className="container">{error}</p>}
        </>
    );
};

export default App;
