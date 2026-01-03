import type { FC, ReactNode } from "react";
import ListIcon from "../assets/list.svg?react";

type HeaderType = {
    children: ReactNode;
};

const Header: FC<HeaderType> = ({ children }) => {
    return (
        <header id="header">
            <h1>
                <span>{children}</span>{" "}
                <ListIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            </h1>
        </header>
    );
};

export default Header;
