import { GetLyricsService, LyricsResult } from "../lyricsServiceIfc";
import got from "got";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokens = require("../../../../tokens.json");

const BASE_URL = "https://orion.apiseeds.com/api/music/lyric";
const APISEEDS_KEY = process.env.APISEEDS_KEY || tokens.apiseeds;


const buildUrl = (artist: string, track: string): string => {
    const url = encodeURI(`${BASE_URL}/${artist}/${track}?apikey=${APISEEDS_KEY}`);
    console.log(url);
    return url;
};

export const getLyrics: GetLyricsService = async (artist: string, track: string): Promise<LyricsResult> => {
    try {
        return await got.get<LyricsResult>(buildUrl(artist, track)).json();
    }
    catch (e) {
        // do nothing
        console.log(e);
    }
};
