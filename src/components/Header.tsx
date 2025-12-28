import type { FC, ReactNode } from "react";

type HeaderType = {
    children: ReactNode;
};

const Header: FC<HeaderType> = ({ children }) => {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
};

export default Header;
