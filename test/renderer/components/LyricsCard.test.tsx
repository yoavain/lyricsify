import * as React from "react";
import LyricsCard from "~components/LyricsCard";
import { render } from "@testing-library/react";

describe("LyricsCard component", () => {
    it("renders correctly - no lyrics", () => {
        const root = render(<LyricsCard />);
        expect(root).toMatchSnapshot();
    });
    it("renders correctly - with lyrics", () => {
        const root = render(<LyricsCard title="Title" artist="Artist" lyrics="These are the lyrics"/>);
        expect(root).toMatchSnapshot();
    });
});
