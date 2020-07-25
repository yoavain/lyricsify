import { test, development } from "../../../../knexfile";
import knex from "knex";
import { LyricsResult } from "~src/renderer/services/lyrics/lyricsServiceIfc";

const schema = "main";
const lyricsTable = "lyrics";

const testMode = process.env.TEST_MODE === "true";
export const knexClient = knex(testMode ? test : development);

const upsert = <T>(tableName: string, data: T) => {
    const wrap = (key: string): string => `"${key.replace(/"/g, "\"\"")}"`;
    return knexClient.raw("INSERT OR REPLACE INTO " +
        tableName +
        " (" + Object.keys(data).map(wrap).join(", ") +
        ") VALUES (" +
        Object.values(data).map(wrap).join(", ") + ")");
};

type LyricsRow = {
    artist: string,
    track: string,
    lyrics: string  // JSON.stringify of LyricsResult
}

export const getLyricsFromDb = async (artist: string, track: string): Promise<LyricsResult | null> => {
    return knexClient
        .withSchema(schema)
        .select<LyricsRow[]>("*")
        .where({ artist, track })
        .from<LyricsRow>(lyricsTable)
        .then((result: LyricsRow[]) => {
            if (result?.length === 1) {
                return JSON.parse(result[0].lyrics) as LyricsResult;
            }
        })
        .catch((err) => {
            return null;
        });

};

export const putLyricsInDb = async (artist: string, track: string, lyrics: LyricsResult): Promise<void> => {
    return upsert<LyricsRow>(lyricsTable, { artist, track, lyrics: JSON.stringify(lyrics) });
};

export const deleteLyricsFromDb = async (artist: string, track: string): Promise<void> => {
    return knexClient
        .withSchema(schema)
        .where({ artist, track })
        .from<LyricsRow>(lyricsTable)
        .del();
};
