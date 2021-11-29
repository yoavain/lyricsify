const { app, BrowserWindow } = require("electron");

try {
    require("electron-reloader")(module);
}
catch (err) {
    // ignore
}

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    window.loadFile("build/index.html");
};

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
