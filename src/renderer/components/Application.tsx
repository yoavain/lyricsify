import * as React from "react";
import { hot } from "react-hot-loader/root";
import Counter from "./Counter";

const Application: React.FunctionComponent = () => (
    <div>
        Hello World from Electron!
        <Counter />
    </div>
);

export default hot(Application);
