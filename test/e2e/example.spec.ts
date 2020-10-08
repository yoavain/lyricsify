import { Application } from "spectron";
import * as path from "path";
import electronPath from "electron";

jest.setTimeout(20000);

describe("Main window", () => {
    let app: Application;

    beforeEach(() => {
        app = new Application({
            // @ts-ignore
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
