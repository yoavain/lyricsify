import type { TagHandlerInterface } from "~src/main/tagHandlers/TagHandler";
import Metaflac from "metaflac-js";

const LYRICS_TAG_NAME = "UNSYNCEDLYRICS";

const addLyrics = async (inFile: string, lyrics: string): Promise<void> => {
    const flac = new Metaflac(inFile);
    flac.removeTag(LYRICS_TAG_NAME);
    flac.setTag(`${LYRICS_TAG_NAME}=${lyrics}`);
    flac.save();
};

const getLyrics = async (inFile: string): Promise<string> => {
    const outFlac = new Metaflac(inFile);
    const lyricsTagValue = outFlac.getTag(LYRICS_TAG_NAME);
    return lyricsTagValue?.split("=")?.[1];
};

export const FlacTagHandler: TagHandlerInterface = {
    addLyrics,
    getLyrics
};
