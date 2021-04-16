import type { LyricsResult } from "../../../../../src/renderer/services/lyrics/lyricsServiceIfc";
import { getLyrics } from "../../../../../src/renderer/services/lyrics/providers/happiDevLyricsService";

describe("Test happiDevLyricsService", () => {
    it("test happi.dev", async () => {
        const result: LyricsResult = await getLyrics("The Beatles", "Yellow Submarine");
        expect(result.result.track.text).toBeTruthy();
    });
    it("test happi.dev - miss", async () => {
        const result: LyricsResult = await getLyrics("The Beatles", "Yellow Su");
        expect(result).toBeUndefined();
    });
});
