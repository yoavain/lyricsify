import * as React from "react";
import type { FC } from "react";
import type { Theme } from "@material-ui/core";
import { createStyles, List, makeStyles } from "@material-ui/core";
import type { RowData } from "~components/FilePanel";
import FilePanel from "~components/FilePanel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper
        },
        inline: {
            display: "inline"
        },
        large: {
            width: theme.spacing(6),
            height: theme.spacing(6)
        }
    })
);

interface FileListPanelProps {
    rows: RowData[];
    selectedIndex: number;
    onSelectItemClick: (selectedIndex: number) => void;
}

const FileListPanel: FC<FileListPanelProps> = (props: FileListPanelProps) => {
    const classes = useStyles();
    const { rows, selectedIndex, onSelectItemClick } = props;

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        onSelectItemClick(index);
    };

    return (
        <List className={classes.root}>
            {rows.map((row: RowData, index) => {
                return (
                    <FilePanel
                        key={index}
                        row={row}
                        isSelected={index === selectedIndex}
                        isLast={index === rows.length - 1}
                        onClick={(event) => handleListItemClick(event, index)}
                        classes={classes}
                    />
                );
            })}
        </List>
    );
};

export default FileListPanel;