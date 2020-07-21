import { development } from "../../../knexfile";
import knex from "knex";

const schema = "main";
const lyricsTable = "lyrics";
const lyricsColumn = "lyrics";

const knexClient = knex(development);

const upsert = <T>(tableName: string, data: T) => {
    const wrap = (key: string): string => `"${key}"`;
    return knexClient.raw("INSERT OR REPLACE INTO " +
        tableName +
        " (" + Object.keys(data).map(wrap).join(", ") +
        ") VALUES (" +
        Object.values(data).map(wrap).join(", ") + ")");
};

type LyricsRow = {
    artist: string,
    track: string,
    lyrics: string
}

export const getLyricsFromDb = async (artist: string, track: string): Promise<string> => {
    return knexClient
        .withSchema(schema)
        .select<LyricsRow[]>(lyricsColumn)
        .where({ artist, track })
        .from<LyricsRow>(lyricsTable)
        .then((result: LyricsRow[]) => {
            if (result?.length === 1) {
                return result[0].lyrics;
            }
        });

};

export const putLyricsInDb = async (artist: string, track: string, lyrics: string): Promise<void> => {
    return upsert<LyricsRow>(lyricsTable, { artist, track, lyrics });
};

const main = async () => {
    const l1: string = await getLyricsFromDb("a", "b");
    console.log(l1);
    
    await putLyricsInDb("a", "b", Math.random().toString());
    
    const l2: string = await getLyricsFromDb("a", "b");
    console.log(l2);
};

main()
    .then(() => console.log("Done"));