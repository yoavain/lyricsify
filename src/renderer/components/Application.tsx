import { Card, CardContent, createMuiTheme, FormControlLabel, MuiThemeProvider, Switch, Theme, Typography } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import * as React from "react";
import { useState } from "react";
import { hot } from "react-hot-loader/root";
import Grid from "@material-ui/core/Grid";
import FileListPanel from "./FileListPanel";
import AppBar from "@material-ui/core/AppBar";
import SelectFolderButton from "./SelectFolderButton";
import { folderParser } from "../../main/folderParser";
import { RowData } from "../../main/staticData";

const themeOptions: ThemeOptions = {
    palette: {
        primary: { main: "#053f5b" },
        secondary: { main: "#5e3c6f" },
        type: "light"
    },
    typography: {
        fontFamily: "Bitter"
    }
};

const useDarkTheme = (): [ThemeOptions, () => void] => {
    const [theme, setTheme] = useState(themeOptions);

    const { palette } = theme;
    const { type } = palette as PaletteOptions;
    const toggleDarkMode = () => {
        const updatedThemeOptions: ThemeOptions = {
            ...theme,
            palette: {
                ...theme.palette,
                type: type === "light" ? "dark" : "light"
            }
        };
        setTheme(updatedThemeOptions);
    };

    return [theme, toggleDarkMode];
};

const onSelectDir =(dir: string, setDir: (dir: string) => void, setInit: (init: boolean) => void): void => {
    setDir(dir);
    setInit(false);
};

const prepareLyrics = (lyrics: string) => {
    return lyrics.split("\n").map((line, index) => <div key={index}>{line}</div>);
};

const Application = () => {
    const [theme, toggleDarkMode] = useDarkTheme();
    const themeConfig: Theme = createMuiTheme(theme);
    const [init, setInit] = useState(false);
    const [dir, setDir] = useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [rows, setRows] = React.useState<RowData[]>([]);

    if (!init && dir) {
        folderParser(dir)
            .then((rows: RowData[]) => setRows(rows))
            .finally(() => setInit(true));
    }

    return (
        <MuiThemeProvider theme={themeConfig}>
            <div>
                <Grid container spacing={1}>
                    <AppBar position="static">
                        <FormControlLabel label={"Dark Theme"} control={<Switch onClick={toggleDarkMode}/>}/>
                        <SelectFolderButton dir={dir} onSelectDir={(dir) => onSelectDir(dir, setDir, setInit)}/>
                    </AppBar>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs>
                        {dir && <FileListPanel rows={rows} selectedIndex={selectedIndex} onSelectItemClick={setSelectedIndex}/>}
                    </Grid>
                    <Grid item xs>
                        { selectedIndex >= 0 &&
                            <Card>
                                <CardContent>
                                    <Typography variant="h4" component="h2">
                                        {rows[selectedIndex].title} - Lyrics
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {rows[selectedIndex].artist}
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        {prepareLyrics(rows[selectedIndex].lyrics ?? "")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        }
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
};

export default hot(Application);
