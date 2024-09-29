import React, { Fragment, useState } from "react";
import { Message } from "./Message";

export const App: () => React.JSX.Element = () => {

    // 状態系の処理
    const [num, setNum] = useState(0);
    /** ボタン押下時の関数 */
    const click: () => void = () => {
        console.log("再レンダリング");
        setNum(num + 1);
    };
    /** style:H1の定義 */
    const styleH1 = {
        color: "blue",
        fontSize: "26px"
    }

    return (
        <Fragment>
            <h1 style={styleH1}>hello</h1>
            <button onClick={click}>ボタン</button>
            <Message color="red" fontSize="24px">This is Props</Message>
            <p>回数{num}</p>
        </Fragment>
    )
}