import { useRef, type FC, type FormEvent } from "react";

type NewGoalType = {
    onAddGoal: (title: string, description: string) => void;
};

const NewGoal: FC<NewGoalType> = ({ onAddGoal }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const submitGoalHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const enteredTitle = titleRef.current!.value;
        const enteredDescripton = descriptionRef.current!.value;

        e.currentTarget.reset();
        onAddGoal(enteredTitle, enteredDescripton);
    };

    return (
        <form onSubmit={submitGoalHandler}>
            <div>
                <label htmlFor="title">Title</label>
                <input id="title" ref={titleRef} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input id="description" ref={descriptionRef} />
            </div>
            <div>
                <button type="submit">Add Goal</button>
            </div>
        </form>
    );
};

export default NewGoal;
