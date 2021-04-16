import type { GetLyricsService, LyricsResult } from "~src/renderer/services/lyrics/lyricsServiceIfc";
import type { OptionsOfJSONResponseBody } from "got";
import got from "got";

const BASE_URL = "https://api.happi.dev/v1/music";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HAPPI_DEV_KEY = process.env.HAPPI_DEV_KEY || require("../../../../../tokens.json").happidev;

type Track = {
    track: string
    id_track: number
    artist: string
    haslyrics: boolean
    id_artist: number
    album: string
    bpm: number
    id_album: number
    cover: string
    lang: string  /* ISO 639-1 */
    api_artist: string
    api_albums: string
    api_album: string
    api_tracks: string
    api_track: string
    api_lyrics: string
}

type TrackResponse = {
    success: boolean
    length: number
    result: Track[]
}

type Artist = {
    artist: string
    id_artist: number
    cover: string
    api_artist: string
}

type ArtistResponse = {
    success: boolean
    length: number
    result: Artist[]
}


type LyricsResponse = {
    "success": boolean,
    "length": number
    "result": {
        "artist": string
        "id_artist": number
        "track": string
        "id_track": number
        "id_album": number
        "album": string
        "lyrics": string
        "api_artist": string
        "api_albums": string
        "api_album": string
        "api_tracks": string
        "api_track": string
        "api_lyrics": string
        "lang": string  /* ISO 639-1 */
        "copyright_label": string
        "copyright_notice": string
        "copyright_text": string
    }
}

type ErrorResponse = {
    success: boolean
    error: string
}

const buildSearchUrl = (artist: string, track: string): string => {
    const url = encodeURI(`${BASE_URL}?q=${artist} ${track}&lyrics=1&type=track`);
    console.log(url);
    return url;
};

export const getLyrics: GetLyricsService = async (artist: string, track: string): Promise<LyricsResult> => {
    if (!HAPPI_DEV_KEY) {
        throw new Error("No API KEY");
    }
    try {
        const options: OptionsOfJSONResponseBody = {
            headers: {
                "x-happi-key": HAPPI_DEV_KEY
            }
        };
        const trackResponse: TrackResponse | ErrorResponse = await got.get<TrackResponse|ErrorResponse>(buildSearchUrl(artist, track), options).json();
        if (trackResponse.success) {
            const trackRes: Track = (trackResponse as TrackResponse).result.find((result: Track) => {
                return result.artist.toLowerCase() === artist.toLowerCase() && result.track.toLowerCase() === track.toLowerCase();
            });
            if (trackRes) {
                const lyrics: LyricsResponse = await got.get<LyricsResponse>(trackRes.api_lyrics, options).json();
                if (lyrics.success) {
                    return {
                        result: {
                            artist: {
                                name: lyrics.result.artist
                            },
                            track: {
                                name: lyrics.result.track,
                                text: lyrics.result.lyrics,
                                lang: {
                                    code: lyrics.result.lang
                                }
                            },
                            copyright: {
                                notice: lyrics.result.copyright_notice,
                                text: lyrics.result.copyright_text
                            }
                        }
                    };
                }
            }
        }
    }
    catch (e) {
        // do nothing
    }
};
