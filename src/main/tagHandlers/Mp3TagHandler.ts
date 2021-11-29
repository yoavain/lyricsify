import type { TagHandlerInterface } from "./TagHandler";
import type { Tags } from "node-id3";
import * as NodeID3 from "node-id3";

const addLyrics = async (inFile: string, lyrics: string): Promise<void> => {
    const tags: Tags = await NodeId3AsyncRead(inFile);
    const updatedTags: Tags = {
        ...tags,
        unsynchronisedLyrics: {
            language: "eng",
            text: lyrics
        }
    };

    await NodeID3AsyncUpdate(updatedTags, inFile);
};

const getLyrics = async (inFile: string): Promise<string> => {
    const tagsInNewFile: Tags = await NodeId3AsyncRead(inFile);
    return tagsInNewFile?.unsynchronisedLyrics?.text;
};

const NodeId3AsyncRead = async (filebuffer: string | Buffer): Promise<Tags> => {
    return new Promise((resolve, reject) => {
        NodeID3.read(filebuffer, {}, (err, tags) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(tags);
            }
        });
    });
};

const NodeID3AsyncUpdate = async (tags: Tags, filepath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        NodeID3.update(tags, filepath, (err: NodeJS.ErrnoException | Error | null) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};

export const Mp3TagHandler: TagHandlerInterface = {
    addLyrics,
    getLyrics
};
