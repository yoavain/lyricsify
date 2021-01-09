import type { Tags } from "node-id3";
import NodeID3 from "node-id3";
import { backupOriginalFile, restoreOriginalFile } from "~src/main/tagHandlers/TagHandlerUtils";
import type { TagHandlerInterface } from "~src/main/tagHandlers/TagHandlerInterface";


const addLyrics = async (inFile: string, lyrics: string): Promise<void> => {
    const tags: Tags = await NodeId3AsyncRead(inFile);
    const updatedTags: Tags = {
        ...tags,
        unsynchronisedLyrics: {
            language: "eng",
            text: lyrics
        }
    };

    await backupOriginalFile(inFile);

    try {
        // Save
        await NodeID3AsyncUpdate(updatedTags, inFile);

        // Validate
        const tagsInNewFile: Tags = await NodeId3AsyncRead(inFile);
        if (tagsInNewFile?.unsynchronisedLyrics?.text !== lyrics) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("Failed to update lyrics");
        }
        console.log("Lyrics updated successfully");
    }
    catch (e) {
        console.error("Failed to update lyrics. Restoring original file");
        await restoreOriginalFile(inFile);
    }
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
    addLyrics
};
