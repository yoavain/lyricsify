import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { createStyles, Theme } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { RowData } from "../../main/staticData";

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

export default function FileListPanel(props: { rows: RowData[] }) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    return (
        <List className={classes.root}>
            {props.rows.map((row: RowData, index) => {
                return (
                    <React.Fragment key={row.title}>
                        <ListItem alignItems="flex-start" button selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
                            <ListItemAvatar>
                                <Avatar alt={row.title} src={row.thumbnailLocation} variant="rounded" className={classes.large} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={row.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                            {row.artist}
                                        </Typography>
                                        {row.album} [{row.year}]
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {index < props.rows.length && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                );
            })}
        </List>
    );
}
