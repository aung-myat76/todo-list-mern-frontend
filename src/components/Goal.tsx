import { type FC } from "react";

type GoalProps = {
    id: number;
    title: string;
    description: string;
    onDelete: (id: number) => void;
};

const Goal: FC<GoalProps> = ({ id, title, description, onDelete }) => {
    return (
        <article>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => onDelete(id)}>DELETE</button>
        </article>
    );
};

export default Goal;
