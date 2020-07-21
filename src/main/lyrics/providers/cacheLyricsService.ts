import { GetLyricsService, LyricsResult } from "~src/main/lyrics/lyricsServiceIfc";
import { getLyrics as apiseedsLyricsServiceGetLyrics } from "~src/main/lyrics/providers/apiseedsLyricsService";
import { getLyricsFromDb, putLyricsInDb } from "~src/main/db/client";

const lyricsServices: GetLyricsService[] = [
    apiseedsLyricsServiceGetLyrics
];

export const getLyrics: GetLyricsService = async (artist: string, track: string): Promise<LyricsResult> => {
    try {
        const lyricsFromDb: LyricsResult = await getLyricsFromDb(artist, track);
        if (lyricsFromDb) {
            return lyricsFromDb;
        }

        let lyricsFromApi: LyricsResult;
        for (let i = 0; i < lyricsServices.length; i++) {
            const lyricsService: GetLyricsService = lyricsServices[i];
            lyricsFromApi = await lyricsService(artist, track);
            if (lyricsFromApi) {
                await putLyricsInDb(artist, track, lyricsFromApi);
                break;
            }
        }
        return lyricsFromApi;
    }
    catch (e) {
        // do nothing
        console.log(e);
    }
};
