import * as React from "react";
import { useState } from "react";
import { AppBar, createMuiTheme, FormControlLabel, Grid, MuiThemeProvider, Switch, Theme, ThemeOptions } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import FileListPanel from "~components/FileListPanel";
import SelectFolderButton from "~components/SelectFolderButton";
import LyricsCard from "~components/LyricsCard";
import { folderParser } from "~src/main/folderParser";
import { RowData } from "../../../test/resources/staticData";
import type { PaletteOptions } from "@material-ui/core/styles/createPalette";
import ReactPlayer from "react-player";

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

enum Loading {
    NOT_LOADED = "NotLoaded",
    LOADING = "Loading",
    LOADED = "Loaded"
}

const Application = () => {
    const [theme, toggleDarkMode] = useDarkTheme();
    const themeConfig: Theme = createMuiTheme(theme);
    const [init, setInit] = useState(Loading.NOT_LOADED);
    const [dir, setDir] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [rows, setRows] = useState<RowData[]>([]);
    const [playing, setPlaying] = useState(false);

    if (init === Loading.NOT_LOADED && dir) {
        setInit(Loading.LOADING);
        folderParser(dir)
            .then((rows: RowData[]) => setRows(rows))
            .finally(() => setInit(Loading.LOADED));
    }

    const onSelectDir = (dir: string): void => {
        setInit(Loading.LOADING);
        // restore defaults
        setSelectedIndex(-1);
        setRows([]);
        // set dir
        setDir(dir);
        // set init to false
        setInit(Loading.NOT_LOADED);
    };

    const onEnded = (): void => {
        setSelectedIndex((selectedIndex + 1) % rows.length);
        setPlaying(true);
    };

    console.log("Rendering Application" + JSON.stringify({ theme: theme?.palette?.type, init, dir, selectedIndex, rows: rows.length }));
    return (
        <MuiThemeProvider theme={themeConfig}>
            <div>
                <Grid container spacing={1}>
                    <AppBar position="static">
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs>
                                <SelectFolderButton dir={dir} onSelectDir={(dir) => onSelectDir(dir)}/>
                            </Grid>
                            <Grid item xs>
                                {selectedIndex > -1 &&
                                    <ReactPlayer
                                        className='react-player'
                                        url={rows[selectedIndex].path}
                                        controls={true}
                                        width='350px'
                                        height='35px'
                                        style={{ color: `${theme?.palette?.secondary}` }}
                                        playIcon={rows[selectedIndex].thumbnail}
                                        playing={playing}
                                        onPlay={() => setPlaying(true)}
                                        onPause={() => setPlaying(false)}
                                        onEnded={onEnded}
                                    />}
                            </Grid>
                            <Grid item>
                                <FormControlLabel label={"Dark Theme"} control={<Switch onClick={toggleDarkMode}/>}/>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs>
                        {dir && <FileListPanel rows={rows} selectedIndex={selectedIndex} onSelectItemClick={setSelectedIndex}/>}
                    </Grid>
                    <Grid item xs>
                        { selectedIndex >= 0 &&
                        <LyricsCard title={rows[selectedIndex].title} artist={rows[selectedIndex].artist} lyrics={rows[selectedIndex].lyrics}/>
                        }
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
};

export default hot(Application);
