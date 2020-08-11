import { Application } from "spectron";
const electronPath = require("electron");
import * as path from "path";

jest.setTimeout(20000);

describe("Main window", () => {
    let app: Application;

    beforeEach(() => {
        app = new Application({
            path: electronPath,
            args: [path.join(__dirname, "..", "..")],
            startTimeout: 10000
        });

        return app.start();
    });

    afterEach(() => {
        if (app.isRunning()) {
            return app.stop();
        }
    });

    it("opens the window", async () => {
        const { client, browserWindow } = app;

        await client.waitUntilWindowLoaded();
        const title = await browserWindow.getTitle();

        expect(title).toBe("Lyricsify");
    });
});
