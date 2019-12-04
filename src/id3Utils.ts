import * as fs from "fs";
const { diff } = require("deep-diff");
const NodeID3 = require("node-id3");

export function addLyrics(inFile: string, outFile: string, lyrics: string) {
    const tags = NodeID3.read(inFile);
    const updatedTags = {
        ...tags,
        unsynchronisedLyrics: {
            language: "eng",
            text: lyrics
        }
    };
    fs.copyFile(inFile, outFile, err => {
        if (err) {
            throw err;
        }
        console.log("source.txt was copied to destination.txt");
    });
    NodeID3.update(updatedTags, outFile, () => {});

    const validationTags = NodeID3.read(outFile);

    const diffData = diff(updatedTags, validationTags);
    console.log(JSON.stringify(diffData, null, "\t"));
}

addLyrics("D:\\Music_TEMP\\test.mp3", "D:\\Music_TEMP\\test.out.mp3", "these are the lyrics\nNothing more");
