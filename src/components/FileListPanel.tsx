import type { FC } from "react";
import React from "react";
import type { Theme } from "@material-ui/core";
import { createStyles, List, makeStyles } from "@material-ui/core";
import type { RowData } from "./FilePanel";
import FilePanel from "./FilePanel";

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
    onSaveLyrics: (selectedIndex: number) => void;
}

export const FileListPanel: FC<FileListPanelProps> = (props: FileListPanelProps) => {
    const classes = useStyles();
    const { rows, selectedIndex } = props;

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        props.onSelectItemClick(index);
    };

    const handleSaveLyrics = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        props.onSaveLyrics(index);
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
                        onSaveLyrics={(event) => handleSaveLyrics(event, index)}
                        classes={classes}
                    />
                );
            })}
        </List>
    );
};
