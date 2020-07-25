import { deleteLyricsFromDb, getLyricsFromDb, putLyricsInDb } from "~src/renderer/services/db/client";
import type { LyricsResult } from "~src/renderer/services/lyrics/lyricsServiceIfc";

describe("Test db client", () => {
    it("Test client", async () => {
        const artist = "artistName";
        const track = "trackName";
        const lyrics = "123456"

        await deleteLyricsFromDb(artist, track);

        const l1: LyricsResult = await getLyricsFromDb(artist, track);
        expect(l1).toBeUndefined();

        await putLyricsInDb(artist, track, { lyrics } as unknown as LyricsResult);

        const l2: LyricsResult = await getLyricsFromDb(artist, track);
        expect(l2).toEqual({ lyrics });
    })
})