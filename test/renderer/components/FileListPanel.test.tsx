import * as React from "react";
import FileListPanel from "../../../src/renderer/components/FileListPanel";
import { rows } from "../../resources/staticData";
import { render } from "@testing-library/react";

describe("FileListPanel component", () => {
    it("renders correctly - none selected", () => {
        const fileListPanelNoneSelected = render(<FileListPanel rows={rows} onSelectItemClick={() => {}} selectedIndex={-1}/>);
        expect(fileListPanelNoneSelected.baseElement).toMatchSnapshot();
    });
    it("renders correctly - with selected", () => {
        const fileListPanelSelected = render(<FileListPanel rows={rows} onSelectItemClick={() => {}} selectedIndex={-1}/>);
        expect(fileListPanelSelected.baseElement).toMatchSnapshot();
    });
});
