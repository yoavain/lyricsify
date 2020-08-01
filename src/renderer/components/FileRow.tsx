import * as React from "react";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";

export interface RowData {
    filename: string;
    path: string;
    tag?: string;
    title?: string;
    artist?: string;
    album?: string;
    track?: string | number;
    year?: number;
    length?: number;
    size?: number;
    lastModified?: number;
    lyrics?: string;
    internetLyrics?: string;
    thumbnail?: string;
}

interface FileRowProps {
    isSelected: boolean,
    isLast: boolean
    onClick: (event) => void,
    classes: ClassNameMap<"inline" | "large" | "root">,
    row: RowData
}

const useStyles = makeStyles(() => ({
    iconButton: {
        colorPrimary: "orange"
    }
}));

const FileRow = (props: FileRowProps) => {
    const { row, isSelected, isLast, onClick } = props;
    const { artist, title, album, year, thumbnail, internetLyrics } = row;
    const classes = useStyles();

    return <React.Fragment>
        <ListItem key={`listItem#${row.title}`} id={`listItem#${row.title}`} alignItems="flex-start" button selected={isSelected} onClick={onClick}>
            <ListItemAvatar>
                <Avatar alt={title} src={thumbnail} variant="rounded" className={props.classes.large}/>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <React.Fragment>
                        <Typography component="span" variant="body2" className={props.classes.inline} color="textPrimary">
                            {artist}
                        </Typography>
                        {album} [{year}]
                    </React.Fragment>
                }
            />
            {internetLyrics &&
            <IconButton className={classes.iconButton}>
                <ArrowDownwardIcon/>
            </IconButton>
            }
        </ListItem>
        {!isLast && <Divider variant="inset" component="li"/>}
    </React.Fragment>;
};

export default FileRow;