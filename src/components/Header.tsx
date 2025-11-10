import React, { type FC, type ReactNode } from "react";

type HeaderProps = {
    image: {
        src: string;
        alt: string;
    };
    children: ReactNode;
};

const Header: FC<HeaderProps> = ({ image, children }) => {
    return (
        <header>
            <img src={image.src} alt={image.alt} />
            {children}
        </header>
    );
};

export default Header;
