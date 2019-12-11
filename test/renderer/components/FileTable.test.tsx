import * as React from "react";
import * as renderer from "react-test-renderer";

import FilesTable from "../../../src/renderer/components/FilesTable";

describe("FilesTable component", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<FilesTable />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
