import { RowData } from "./staticData";
import { Dirent, promises as fs } from "fs";
import * as MusicMetadata from "music-metadata";
import { IAudioMetadata } from "music-metadata";
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
        const fileStats = await fs.stat(audioFilePath);
        const audioMetadata: IAudioMetadata = await MusicMetadata.parseFile(audioFilePath);

        if (audioMetadata) {
            rowsData.push({
                filename: audioFileName,
                title: audioMetadata.common?.title,
                artist: audioMetadata.common?.artist,
                album: audioMetadata.common?.album,
                year: audioMetadata.common?.year,
                track: audioMetadata.common?.track?.no,
                hasLyrics: false,
                lastModified: 0,
                length: audioMetadata.format?.duration,
                path: audioFilePath,
                size: fileStats?.size,
                tag: audioMetadata.format?.container
            });
        }
    }
    
    return rowsData;
};