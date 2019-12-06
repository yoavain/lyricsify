import * as React from "react";
import { hot } from "react-hot-loader/root";
// import Counter from "./Counter";
import FilesTable from "./FilesTable";

const Application = () => (
    <div>
        Hello World from Electron!
        {/*<Counter />*/}
        <FilesTable />
    </div>
);

export default hot(Application);
