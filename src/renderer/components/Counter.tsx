import * as React from "react";
import { useState } from "react";

require("./Counter.scss");
const redCubeImg = require("./RedCube.jpg");

const Counter: React.FunctionComponent = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div className="counter">
            <p>
                <img src={redCubeImg} />
            </p>
            <p id="counter-value">Current value: {counter}</p>
            <p>
                <button id="increment" onClick={() => setCounter(counter + 1)}>
                    Increment
                </button>
                <button id="decrement" onClick={() => setCounter(counter - 1)}>
                    Decrement
                </button>
            </p>
        </div>
    );
};

export default Counter;
