import { BrowserWindow, dialog, OpenDialogOptions, remote } from "electron";
import * as React from "react";
import { useState } from "react";

const SelectFolderButton: React.FunctionComponent = () => {
    const [dir, setDir] = useState("");

    const selectDirectoryWindow = (): Promise<Electron.OpenDialogReturnValue> => {
        const mainWindow: BrowserWindow = remote.getCurrentWindow();
        if (mainWindow === null) {
            return Promise.reject(new Error("MainWindow is closed"));
        }

        const options: OpenDialogOptions = { properties: ["openDirectory"] };
        return dialog.showOpenDialog(mainWindow, options);
    };

    const selectFolder = () => {
        selectDirectoryWindow().then((openDialogReturnValue) => {
            setDir(openDialogReturnValue.filePaths[0]);
        });
    };

    return (
        <div className="counter">
            <button id="increment" onClick={selectFolder}>
                {dir || "Select Directory"}
            </button>
        </div>
    );
};

export default SelectFolderButton;
