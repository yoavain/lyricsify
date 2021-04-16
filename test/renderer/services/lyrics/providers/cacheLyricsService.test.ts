const mockGetLyrics = jest.fn((artist: string, track: string): string => `${artist} - ${track} - lyrics`);

jest.mock("~src/renderer/services/lyrics/providers/apiseedsLyricsService", () => {
    return {
        getLyrics: mockGetLyrics
    };
});

jest.mock("~src/renderer/services/lyrics/providers/happiDevLyricsService", () => {
    return {
        getLyrics: mockGetLyrics
    };
});

import { getLyrics } from "~src/renderer/services/lyrics/providers/cacheLyricsService";
import { knexClient } from "~src/renderer/services/db/dbClient";

describe("test cache", () => {
    beforeAll(() => {
        // init in-memory db
        return knexClient.migrate.latest();
    });

    afterAll(() => {
        // destroy in-memory db
        return knexClient.migrate.rollback().then(() => knexClient.destroy());
    });

    it("Test cache", async () => {
        // Get 1st time
        const resultFromService = await getLyrics("The Beatles", "Yellow Submarine");
        expect(resultFromService).toEqual("The Beatles - Yellow Submarine - lyrics");
        // expect miss
        expect(mockGetLyrics).toHaveBeenCalledTimes(1);
        expect(mockGetLyrics).toHaveBeenCalledWith("The Beatles", "Yellow Submarine");

        // Get 2nd time
        const resultFromCache = await getLyrics("The Beatles", "Yellow Submarine");
        expect(resultFromCache).toEqual("The Beatles - Yellow Submarine - lyrics");
        // expect hit
        expect(mockGetLyrics).toHaveBeenCalledTimes(1);
        expect(mockGetLyrics).toHaveBeenCalledWith("The Beatles", "Yellow Submarine");
    });
});