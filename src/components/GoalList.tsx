import { type FC, type ReactNode } from "react";
import type { GoalType } from "../App";

import Goal from "./Goal";
import InfoBox from "./InfoBox";

type GoalListType = {
    goals: GoalType[];
    deleteGoalHandler: (id: number) => void;
};

const GoalList: FC<GoalListType> = ({ goals, deleteGoalHandler }) => {
    let warningBox: ReactNode = undefined;
    if (goals.length === 0) {
        return (
            <InfoBox mode="hint">
                You haven't added any goal yet, add some?
            </InfoBox>
        );
    }

    if (goals.length >= 4) {
        warningBox = (
            <InfoBox mode="warning" severity="medium">
                You have added many goals!
            </InfoBox>
        );
    }

    return (
        <>
            {warningBox}
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <Goal
                            id={goal.id}
                            title={goal.title}
                            onDelete={deleteGoalHandler}
                            description={goal.description}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default GoalList;
