import * as React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import LyricsCard from "../../../src/renderer/components/LyricsCard";

describe("LyricsCard component", () => {
    it("renders correctly", () => {
        let root: ReactTestRenderer | undefined;
        act(() => {
            root = create(<LyricsCard />);
        });

        expect(root?.toJSON()).toMatchSnapshot();

        act(() => {
            root?.update(<LyricsCard title="Title" artist="Artist" lyrics="These are the lyrics"/>);
        });
        expect(root?.toJSON()).toMatchSnapshot();
    });
});
