import { RowData } from "./staticData";
import { Dirent, promises as fs } from "fs";
import * as NodeID3 from "node-id3";
import * as path from "path";

enum SUPPORTED_FILE_TYPES {
    FLAC = ".flac",
    MP3 = ".mp3"
}

const isRelevantFile = (file: Dirent): boolean => {
    return file.isFile() && (file.name.toLowerCase().endsWith(SUPPORTED_FILE_TYPES.FLAC) || file.name.toLowerCase().endsWith(SUPPORTED_FILE_TYPES.MP3));
};

export const folderParser = async (dir: string): Promise<Array<RowData>> => {
    const files: Dirent[] = await fs.readdir(dir, { withFileTypes: true });
    const relevantFiles: Dirent[] = files.filter((anyFile: Dirent) => isRelevantFile(anyFile));
    
    const rowsData: RowData[] = [];

    for (const audioFile of relevantFiles) {
        const audioFileName = audioFile.name;
        const audioFilePath = path.resolve(dir, audioFileName);
        const fileContent: Buffer = await fs.readFile(audioFilePath);
        const tags: NodeID3.Tags = NodeID3.read(fileContent);
        if (tags) {
            rowsData.push({
                filename: audioFileName,
                title: tags.title,
                artist: tags.artist,
                album: tags.album,
                year: tags.year,
                track: tags.trackNumber,
                hasLyrics: false,
                lastModified: 0,
                length: tags.length,
                path: audioFilePath,
                size: tags.size,
                tag: tags.fileType
            });
        }
    }
    
    return rowsData;
};