import React, { memo } from "react";

type Props = {
    children?: string,
    color?: string,
    fontSize?: string
}

export const Message = memo(({children, ...style}: Props) => {
    console.log(`Message.txsのレンダリング`);
    return <p style={style}>{children}</p>;
});