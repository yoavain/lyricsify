import type { FC } from "react";
import React from "react";
import * as path from "path";
require("./SelectFolderButton.css");

interface SelectFolderButtonProps {
    dir: string;
    onSelectDir: (dir: string) => void;
}

export const SelectFolderButton: FC<SelectFolderButtonProps> = (props: SelectFolderButtonProps) => {
    const selectFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList = e.target.files;
        console.log(files);
        if (files.length > 0) {
            const file: File = files[0];
            props.onSelectDir(path.resolve(file.path, ".."));
        }
    };

    return (
        <div>
            <label className="custom-file-upload">
                <input
                    type="file"
                    // @ts-ignore
                    webkitdirectory="true"
                    onChange={selectFolder}
                />
                <i className="fa fa-cloud-upload" />{props.dir || "Select Directory"}
            </label>
        </div>
    );
};
