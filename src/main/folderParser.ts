import { RowData } from "./staticData";
import { Dirent, promises as fs } from "fs";
import * as NodeID3 from "node-id3";

enum SUPPORTED_FILE_TYPES {
    FLAC = ".flac",
    MP3 = ".mp3"
}

const isRelevantFile = (file: Dirent): boolean => {
    return file.isFile() && (file.name.endsWith(SUPPORTED_FILE_TYPES.FLAC) || file.name.endsWith(SUPPORTED_FILE_TYPES.MP3));
};

export const folderParser = async (dir: string): Promise<Array<RowData>> => {
    const files: Dirent[] = await fs.readdir(dir, { withFileTypes: true });
    
    return files.filter((anyFile) => isRelevantFile(anyFile)).map<RowData>((audioFile: Dirent) => {
        const tags: NodeID3.Tags = NodeID3.read(audioFile.name);

        const rowData: RowData =  {
            filename: audioFile.name,
            title: tags.title,
            artist: tags.artist,
            album: tags.album,
            year: tags.year,
            track: tags.trackNumber,
            hasLyrics: false,
            lastModified: 0,
            length: tags.length,
            path: audioFile.name,
            size: tags.size,
            tag: tags.fileType
        };

        return rowData;
    });
};