import { motion, AnimatePresence } from "framer-motion";
import type { FC, ReactNode } from "react";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { opacity: 0, y: "-50px", scale: 0.95 },
    visible: {
        opacity: 1,
        y: "0px",
        scale: 1,
        transition: { type: "spring", duration: 0.5 }
    },
    exit: { opacity: 0, scale: 0.9, y: "20px" }
};

type ModalType = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: ReactNode;
};

const Modal: FC<ModalType> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children
}) => {
    return (
        /* AnimatePresence is required to enable exit animations */
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-backdrop"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose} // Close when clicking outside
                >
                    <motion.div
                        className="modal-content"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <h2>{title}</h2>
                        <div className="modal-body">{children}</div>
                        <div className="actions">
                            <button onClick={onClose} className="btn close-btn">
                                Close
                            </button>
                            <button
                                onClick={onConfirm}
                                className="btn btn-danger confirm-btn">
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
