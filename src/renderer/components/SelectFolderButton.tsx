import * as React from "react";
import { Button } from "@material-ui/core";
import { BrowserWindow, OpenDialogOptions, remote } from "electron";

const { dialog } = require("electron").remote;

interface SelectFolderButtonProps {
    dir: string;
    onSelectDir: (dir: string) => void;
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
            props.onSelectDir(openDialogReturnValue.filePaths[0]);
        });
    };

    console.log(`Rendering SelectFolderButton ${JSON.stringify(props)}`);
    return (
        <div className="counter">
            <Button id="increment" variant="contained" color="secondary" onClick={selectFolder}>
                {props.dir || "Select Directory"}
            </Button>
        </div>
    );
};

export default SelectFolderButton;
