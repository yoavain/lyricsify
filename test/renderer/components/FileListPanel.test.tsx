import * as React from "react";
import * as renderer from "react-test-renderer";
import FileListPanel from "../../../src/renderer/components/FileListPanel";
import { rows } from "../../../src/main/staticData";

describe("FileListPanel component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<FileListPanel rows={rows}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
