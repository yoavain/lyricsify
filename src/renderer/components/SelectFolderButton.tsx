import * as React from "react";
import type { FC } from "react";
import { Button } from "@material-ui/core";
import type { BrowserWindow, OpenDialogOptions } from "electron";
import { remote } from "electron";

const { dialog } = remote;

interface SelectFolderButtonProps {
    dir: string;
    onSelectDir: (dir: string) => void;
}

const SelectFolderButton: FC<SelectFolderButtonProps> = (props: SelectFolderButtonProps) => {
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

    return (
        <Button id="select-folder-button" data-testid="select-folder-button" variant="contained" color="secondary" onClick={selectFolder}>
            {props.dir || "Select Directory"}
        </Button>
    );
};

export default SelectFolderButton;
