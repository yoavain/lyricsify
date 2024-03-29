import React, { useEffect, useState } from "react";
import type { Theme, ThemeOptions } from "@material-ui/core";
import { AppBar, createTheme, FormControlLabel, Grid, MuiThemeProvider, Switch } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import type { PaletteOptions } from "@material-ui/core/styles/createPalette";
import ReactPlayer from "react-player";
import type { RowData } from "./FilePanel";
import { SelectFolderButton } from "./SelectFolderButton";
import { LyricsCard } from "./LyricsCard";
import { FileListPanel } from "./FileListPanel";
import { folderParser } from "../main/folderParser";
import { addLyrics } from "../main/tagHandlers/TagHandler";

const themeOptions: ThemeOptions = {
    palette: {
        primary: { main: "#053f5b" },
        secondary: { main: "#5e3c6f" },
        type: "dark"
    },
    typography: {
        fontFamily: "Bitter"
    }
};

const useDarkTheme = (): [ThemeOptions, () => void] => {
    const [theme, setTheme] = useState<ThemeOptions>(themeOptions);

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

export const Application = () => {
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

    const themeConfig: Theme = createTheme(theme);

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
    
    const saveLyrics = async (selectedIndex: number) => {
        if (selectedIndex >= 0) {
            const row = rows[selectedIndex];
            if (row.internetLyrics) {
                console.log("Saving lyrics to " + row.path);
                await addLyrics(row.path, row.internetLyrics);
            }
        }
    };

    return (
        <MuiThemeProvider theme={themeConfig}>
            <div data-testid={`application-${themeConfig.palette.type}-theme`}>
                <Grid container spacing={1}>
                    <AppBar position="static">
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs>
                                <SelectFolderButton dir={dir} onSelectDir={onSelectDir}/>
                            </Grid>
                            <Grid item xs>
                                {selectedRow ?
                                    <ReactPlayer
                                        className="react-player"
                                        url={selectedRow.path}
                                        controls={true}
                                        width="350px"
                                        height="35px"
                                        style={{ color: `${theme?.palette?.secondary}` }}
                                        playing={playing}
                                        onPlay={() => setPlaying(true)}
                                        onPause={() => setPlaying(false)}
                                        onEnded={onEnded}
                                    /> : null
                                }
                            </Grid>
                            <Grid item>
                                <FormControlLabel label={"Dark Theme"} data-testid="dark-theme-button" control={<Switch onClick={toggleDarkMode}/>}/>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs>
                        {rows.length > 0 ?
                            <FileListPanel
                                rows={rows}
                                selectedIndex={selectedIndex}
                                onSelectItemClick={setSelectedIndex}
                                onSaveLyrics={saveLyrics}
                            /> : null
                        }
                    </Grid>
                    <Grid item xs>
                        {selectedRow ?
                            <LyricsCard
                                title={selectedRow.title}
                                artist={selectedRow.artist}
                                lyrics={selectedRow.lyrics || selectedRow.internetLyrics}
                                gotLyricsFromInternetCallback={(lyrics) => internetLyricsSetter(selectedIndex, lyrics)}
                            /> : null
                        }
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
};

export default hot(Application);
