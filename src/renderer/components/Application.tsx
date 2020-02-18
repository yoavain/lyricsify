import { createMuiTheme, FormControlLabel, MuiThemeProvider, Switch, Theme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import * as React from "react";
import { useState } from "react";
import { hot } from "react-hot-loader/root";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FileListPanel from "./FileListPanel";
import { rows } from "../../main/staticData";
import AppBar from "@material-ui/core/AppBar";

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
    const themeConfig: Theme = createMuiTheme(theme);

    return (
        <MuiThemeProvider theme={themeConfig}>
            <div>
                <Grid container spacing={1}>
                    <AppBar position="static">
                        <FormControlLabel label={"Dark Theme"} control={<Switch onClick={toggleDarkMode}/>}/>
                    </AppBar>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <FileListPanel rows={rows}/>
                    </Grid>
                    <Grid item xs>
                        <Paper>Lyrics Placeholder</Paper>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
};

export default hot(Application);
