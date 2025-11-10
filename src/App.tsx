import "./App.css";

import Header from "./components/Header.tsx";
import logo from "./assets/react.svg";
import { useState } from "react";
import GoalList from "./components/GoalList.tsx";
import NewGoal from "./components/NewGoal.tsx";

export type GoalType = {
    id: number;
    title: string;
    description: string;
};

function App() {
    const [goals, setGoals] = useState<GoalType[]>([]);

    const addGoalHanldler = (title: string, description: string) => {
        setGoals((preGoals) => {
            const newGoal: GoalType = {
                id: Math.random(),
                title: title,
                description: description,
            };
            return [...preGoals, newGoal];
        });
    };

    const deleteGoalHandler = (id: number) => {
        setGoals((preGoals) => {
            return preGoals.filter((goal) => goal.id !== id);
        });
    };

    return (
        <main>
            <Header image={{ src: logo, alt: "a list of goals" }}>
                <h1>Your Course Goals</h1>
            </Header>
            <NewGoal onAddGoal={addGoalHanldler} />
            <GoalList goals={goals} deleteGoalHandler={deleteGoalHandler} />
        </main>
    );
}

export default App;
