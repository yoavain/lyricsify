import * as React from "react";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import FileListPanel from "../../../src/renderer/components/FileListPanel";
import { rows } from "../../resources/staticData";

describe("FileListPanel component", () => {
    it("renders correctly", () => {
        let root: ReactTestRenderer | undefined;
        act(() => {
            root = create(<FileListPanel rows={rows} onSelectItemClick={() => {}} selectedIndex={-1}/>);
        });

        expect(root?.toJSON()).toMatchSnapshot();

        act(() => {
            root?.update(<FileListPanel rows={rows} onSelectItemClick={() => {}} selectedIndex={0}/>);
        });
        expect(root?.toJSON()).toMatchSnapshot();
    });
});
