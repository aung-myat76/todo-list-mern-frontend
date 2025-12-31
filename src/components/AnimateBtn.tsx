import { motion, type MotionProps } from "framer-motion";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

type AnimatedBtnType = {
    children: ReactNode;
    addCls?: string;
} & ComponentPropsWithoutRef<"button"> &
    MotionProps;

const AnimatedBtn: FC<AnimatedBtnType> = ({
    children,
    addCls,
    ...othersProps
}) => {
    const buttonVariants = {
        initial: { scale: 1 },
        tap: { scale: 0.95 },
        exit: { scale: 1 }
    };

    return (
        <motion.button
            variants={buttonVariants}
            initial="initial"
            whileTap="tap"
            exit="exit"
            className={`btn ${addCls}`}
            {...othersProps}>
            {children}
        </motion.button>
    );
};

export default AnimatedBtn;
