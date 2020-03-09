import { remote, BrowserWindow, OpenDialogOptions } from "electron";
const { dialog } = require("electron").remote;
import * as React from "react";

interface SelectFolderButtonProps {
    dir: string;
    setDir: (dir: string) => void;
}

const SelectFolderButton: React.FunctionComponent<SelectFolderButtonProps> = (props: SelectFolderButtonProps) => {
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
            props.setDir(openDialogReturnValue.filePaths[0]);
        });
    };

    return (
        <div className="counter">
            <button id="increment" onClick={selectFolder}>
                {props.dir || "Select Directory"}
            </button>
        </div>
    );
};

export default SelectFolderButton;
