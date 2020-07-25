import { GetLyricsService, LyricsResult } from "~src/renderer/services/lyrics/lyricsServiceIfc";
import got from "got";

const BASE_URL = "https://orion.apiseeds.com/api/music/lyric";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const APISEEDS_KEY = process.env.APISEEDS_KEY || require("../../../../../tokens.json").apiseeds;


const buildUrl = (artist: string, track: string): string => {
    const url = encodeURI(`${BASE_URL}/${artist}/${track}?apikey=${APISEEDS_KEY}`);
    console.log(url);
    return url;
};

export const getLyrics: GetLyricsService = async (artist: string, track: string): Promise<LyricsResult> => {
    let result;
    try {
        result = await got.get<LyricsResult>(buildUrl(artist, track)).json();
    }
    catch (e) {
        // do nothing
        console.log(e);
    }
    return result;
};
