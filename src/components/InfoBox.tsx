import { type ReactNode } from "react";

type HintInfoBox = {
    mode: "hint";
    children: ReactNode;
};

type WarningInfoBox = {
    mode: "warning";
    severity: "low" | "medium" | "high";
    children: ReactNode;
};

type InfoBoxType = HintInfoBox | WarningInfoBox;

const InfoBox = (props: InfoBoxType) => {
    const { mode, children } = props;

    if (mode === "hint") {
        return (
            <div>
                <p>{children}</p>
            </div>
        );
    }

    const { severity } = props;

    return (
        <div className={`info-box info-box-warning severity-${severity}`}>
            <h2>Warning</h2>
            <p>{children}</p>
        </div>
    );
};

export default InfoBox;
