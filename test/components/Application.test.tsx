import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Application } from "~src/components/Application";

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
            const page = renderApplication();

            // Default "dark"
            expect(page.queryByTestId("application-dark-theme")).not.toBeNull();

            // Toggle
            const darkThemeButton = page.queryByTestId("dark-theme-button");
            userEvent.click(darkThemeButton);

            // Light
            expect(page.queryByTestId("application-light-theme")).not.toBeNull();
        });
    });

    describe("Test FileListPanel", () => {
        
    });

    describe("Test FilePanel", () => {

    });

    describe("Test LyricsCard", () => {
        
    });
});
