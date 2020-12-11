import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Application } from "~src/renderer/components/Application";

jest.mock("electron", () => ({
    remote: {}
}));

describe("Test Application", () => {

    const renderApplication = () => {
        return render(<Application/>);
    };
    
    beforeEach(() => {
    });
    
    describe("Test Application Theme", () => {
        it("Should toggle themes (default=dark)", () => {
            const { queryByTestId } = renderApplication();

            // Default "dark"
            expect(queryByTestId("application-dark-theme")).not.toBeNull();

            // Toggle
            const darkThemeButton = queryByTestId("dark-theme-button");
            userEvent.click(darkThemeButton);

            // Light
            expect(queryByTestId("application-light-theme")).not.toBeNull();
        });
    });

    describe("Test FileListPanel", () => {
        it("Should select dir", async () => {
            const page = renderApplication();

            const selectFolderButton = page.queryByTestId("select-folder-button");
            userEvent.click(selectFolderButton);
        });
    });

    describe("Test FilePanel", () => {

    });

    describe("Test LyricsCard", () => {
        
    });
});
