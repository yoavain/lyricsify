import { getLyrics as happiDevLyricsServiceGetLyrics } from "./happiDevLyricsService";
import type { GetLyricsService, LyricsResult } from "../lyricsServiceIfc";
import { getLyricsFromDb, putLyricsInDb } from "../../db/dbClient";

const lyricsServices: GetLyricsService[] = [
    happiDevLyricsServiceGetLyrics
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
    }
};
