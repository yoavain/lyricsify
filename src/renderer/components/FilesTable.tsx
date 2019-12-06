import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as moment from "moment";
import * as numeral from "numeral";
import * as React from "react";

interface Column {
    id: "filename" | "path" | "tag" | "title" | "artist" | "album" | "track" | "year" | "length" | "size" | "lastModified" | "hasLyrics";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "filename", label: "Filename", minWidth: 50 },
    { id: "path", label: "Path", minWidth: 50 },
    { id: "tag", label: "Tag", minWidth: 50 },
    { id: "title", label: "Title", minWidth: 50 },
    { id: "artist", label: "Artist", minWidth: 50 },
    { id: "album", label: "Album", minWidth: 50 },
    {
        id: "track",
        label: "Track #",
        minWidth: 50,
        align: "right",
        format: (value: number) => value.toLocaleString()
    },
    {
        id: "year",
        label: "Year",
        minWidth: 50,
        align: "right",
        format: (value: number) => value.toLocaleString()
    },
    {
        id: "length",
        label: "Length",
        minWidth: 50,
        align: "right",
        format: (value: number) => numeral(value).format("00:00:00")
    },
    {
        id: "size",
        label: "Size",
        minWidth: 50,
        align: "right",
        format: (value: number) => numeral(value).format("0.00b")
    },
    {
        id: "lastModified",
        label: "Last Modified",
        minWidth: 50,
        align: "right",
        format: (value: number) => moment(value).format("MM/DD/YYYY")
    },
    {
        id: "hasLyrics",
        label: "Has Lyrics",
        minWidth: 50,
        align: "right",
        format: (value: number) => moment(value).format("MM/DD/YYYY")
    }
];

interface RowData {
    filename: string;
    path: string;
    tag: string;
    title: string;
    artist: string;
    album: string;
    track: number;
    year: number;
    length: number;
    size: number;
    lastModified: number;
    hasLyrics: boolean;
}

function createData(
    filename: string,
    path: string,
    tag: string,
    title: string,
    artist: string,
    album: string,
    track: number,
    year: number,
    length: number,
    size: number,
    lastModified: number,
    hasLyrics: boolean = false
): RowData {
    return { filename, path, tag, title, artist, album, track, year, length, size, lastModified, hasLyrics };
}

const rows = [
    createData(
        "01 - Happens To The Heart.flac",
        "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\",
        "FLAC",
        "Happens To The Heart",
        "Leonard Cohen",
        "Thanks For The Dance",
        1,
        2019,
        273,
        22749256,
        1574467200000
    ),
    createData("02 - Moving On.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Moving On", "Leonard Cohen", "Thanks For The Dance", 2, 2019, 192, 14556156, 1574467200000),
    createData(
        "03 - The Night of Santiago.flac",
        "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\",
        "FLAC",
        "The Night of Santiago",
        "Leonard Cohen",
        "Thanks For The Dance",
        3,
        2019,
        255,
        20998200,
        1574467200000
    ),
    createData(
        "04 - Thanks For The Dance.flac",
        "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\",
        "FLAC",
        "Thanks For The Dance",
        "Leonard Cohen",
        "Thanks For The Dance",
        4,
        2019,
        253,
        18920215,
        1574467200000
    ),
    createData("05 - It's Torn.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "It's Torn", "Leonard Cohen", "Thanks For The Dance", 5, 2019, 178, 13998876, 1574467200000),
    createData("06 - The Goal.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "The Goal", "Leonard Cohen", "Thanks For The Dance", 6, 2019, 72, 5576134, 1574467200000),
    createData("07 - Puppets.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Puppets", "Leonard Cohen", "Thanks For The Dance", 7, 2019, 160, 12369996, 1574467200000),
    createData("08 - The Hills.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "The Hills", "Leonard Cohen", "Thanks For The Dance", 8, 2019, 258, 25574353, 1574467200000),
    createData(
        "09 - Listen To The Hummingbird.flac",
        "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\",
        "FLAC",
        "Listen To The Hummingbird",
        "Leonard Cohen",
        "Thanks For The Dance",
        9,
        2019,
        121,
        7459732,
        1574467200000
    )
];

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: "auto"
    }
});

export default function FilesTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column: Column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: RowData) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.filename}>
                                    {columns.map((column: Column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === "number" ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}
