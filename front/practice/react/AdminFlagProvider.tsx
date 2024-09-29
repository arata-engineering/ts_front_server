import { createContext } from "react";
import React from "react";

export const AdminFlagContext = createContext({});

type Props = {
    children?: React.JSX.Element
}

export const AdminFlagProvider = (props: Props) => {
    const { children } = props;

    const sampleObj = { sampleValue: "test" };

    return (
        <AdminFlagContext.Provider value={sampleObj}>
            {children}
        </AdminFlagContext.Provider>
    );
};