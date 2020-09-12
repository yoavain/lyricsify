import * as React from "react";
import { useEffect, useState } from "react";
import { AppBar, createMuiTheme, FormControlLabel, Grid, MuiThemeProvider, Switch, Theme, ThemeOptions } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import FileListPanel from "~components/FileListPanel";
import SelectFolderButton from "~components/SelectFolderButton";
import LyricsCard from "~components/LyricsCard";
import { folderParser } from "~src/main/folderParser";
import { RowData } from "~components/FilePanel";
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

const Application = () => {
    const [theme, toggleDarkMode] = useDarkTheme();
    const [dir, setDir] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedRow, setSelectedRow] = useState<RowData>(undefined);
    const [rows, setRows] = useState<RowData[]>([]);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (dir) {
            folderParser(dir)
                .then((rows: RowData[]) => {
                    setSelectedIndex(-1);
                    setRows(rows);
                });
        }
        else {
            setRows([]);
        }
    }, [dir]);

    useEffect(() => {
        setSelectedRow(rows[selectedIndex]);
    }, [rows, selectedIndex]);

    const themeConfig: Theme = createMuiTheme(theme);

    const onSelectDir = (dir: string): void => {
        setDir(dir);
    };

    const onEnded = (): void => {
        setSelectedIndex((selectedIndex + 1) % rows.length);
        setPlaying(true);
    };

    const internetLyricsSetter = (selectedIndex: number, lyrics: string) => {
        if (selectedRow) {
            setRows([
                ...rows.slice(0, selectedIndex),
                { ...selectedRow, internetLyrics: lyrics },
                ...rows.slice(selectedIndex + 1)
            ]);
        }
    };

    return (
        <MuiThemeProvider theme={themeConfig}>
            <div>
                <Grid container spacing={1}>
                    <AppBar position="static">
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs>
                                <SelectFolderButton dir={dir} onSelectDir={onSelectDir}/>
                            </Grid>
                            <Grid item xs>
                                {selectedRow &&
                                <ReactPlayer
                                    className='react-player'
                                    url={selectedRow.path}
                                    controls={true}
                                    width='350px'
                                    height='35px'
                                    style={{ color: `${theme?.palette?.secondary}` }}
                                    playIcon={selectedRow.thumbnail}
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
                        {rows.length > 0 && <FileListPanel rows={rows} selectedIndex={selectedIndex} onSelectItemClick={setSelectedIndex}/>}
                    </Grid>
                    <Grid item xs>
                        {selectedRow &&
                        <LyricsCard
                            title={selectedRow.title}
                            artist={selectedRow.artist}
                            lyrics={selectedRow.lyrics || selectedRow.internetLyrics}
                            gotLyricsFromInternetCallback={(lyrics) => internetLyricsSetter(selectedIndex, lyrics)}
                        />
                        }
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
};

export default hot(Application);
