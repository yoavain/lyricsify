import * as fs from "fs";
import * as path from "path";
import { diff } from "deep-diff";
import type { Tags } from "node-id3";
import * as NodeID3 from "node-id3";

const fsPromises = fs.promises;

const BACKUP_DIR = "_backup";

export const addLyrics = async (inFile: string, lyrics: string) => {
    const tags: Tags = await NodeId3AsyncRead(inFile);
    const updatedTags: Tags = {
        ...tags,
        unsynchronisedLyrics: {
            language: "eng",
            text: lyrics
        }
    };


    // Backup original file
    const parsedFile: path.ParsedPath = path.parse(inFile);
    const backupDir: string = path.join(parsedFile.dir, BACKUP_DIR);
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }
    const backupFile = path.join(backupDir, parsedFile.base);
    await fsPromises.copyFile(inFile, backupFile);

    console.log("source.txt was copied to destination.txt");
    await NodeID3AsyncUpdate(updatedTags, inFile);

    const validationTags: Tags = await NodeId3AsyncRead(inFile);

    const diffData = diff(updatedTags, validationTags);
    console.log(JSON.stringify(diffData, null, "\t"));
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