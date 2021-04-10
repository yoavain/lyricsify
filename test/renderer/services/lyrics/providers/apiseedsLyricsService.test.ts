import { getLyrics } from "~src/renderer/services/lyrics/providers/apiseedsLyricsService";
import type { LyricsResult } from "~src/renderer/services/lyrics/lyricsServiceIfc";

describe("Test apiseedsLyricsService", () => {
    it.skip("test apiseeds", async () => {
        const result: LyricsResult = await getLyrics("The Beatles", "Yellow Submarine");
        expect(result.result.similarity).toBe(1);
        expect(result.result.probability).toBe(100);
        expect(result.result.track.text).toBeTruthy();
    });
    it.skip("test apiseeds - approx", async () => {
        const result: LyricsResult = await getLyrics("The Beatles", "Yellow Submarin");
        expect(result.result.similarity).toBeLessThanOrEqual(1);
        expect(result.result.probability).toBeLessThanOrEqual(100);
        expect(result.result.track.text).toBeTruthy();
    });
    it.skip("test apiseeds - miss", async () => {
        const result: LyricsResult = await getLyrics("The Beatles", "Yellow Su");
        expect(result).toBeUndefined();
    });
});
