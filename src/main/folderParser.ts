import { Dirent, promises as fs } from "fs";
import * as MusicMetadata from "music-metadata";
import * as path from "path";
import type { IAudioMetadata, IPicture, ITag } from "music-metadata";
import { RowData } from "~components/FileRow";

enum SUPPORTED_FILE_TYPES {
    FLAC = ".flac",
    MP3 = ".mp3"
}

const isRelevantFile = (file: Dirent): boolean => {
    return file.isFile() && (file.name.toLowerCase().endsWith(SUPPORTED_FILE_TYPES.FLAC) || file.name.toLowerCase().endsWith(SUPPORTED_FILE_TYPES.MP3));
};

const getLyrics = (audioMetadata: IAudioMetadata): string | undefined => {
    if (audioMetadata?.format?.tagTypes?.includes("ID3v2.3")) {
        const id3v2Tag: ITag[] = audioMetadata?.native?.["ID3v2.3"];
        const lyricsTag = id3v2Tag?.find((nativeTag: ITag) => nativeTag?.id === "USLT");
        return lyricsTag?.value?.text;
    }

    return undefined;
};

const getThumbnail = (audioMetadata: IAudioMetadata): string | undefined => {
    const thumbnail: IPicture | undefined = audioMetadata?.common?.picture?.[0];
    if (thumbnail) {
        return URL.createObjectURL(new Blob([new Uint8Array(thumbnail.data)], { type: thumbnail.format }));
    }
    return undefined;
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
                lyrics: getLyrics(audioMetadata),
                lastModified: fileStats?.mtimeMs,
                length: audioMetadata.format?.duration,
                path: audioFilePath,
                size: fileStats?.size,
                tag: audioMetadata.format?.container,
                thumbnail: getThumbnail(audioMetadata)
            });
        }
    }
    
    return rowsData;
};

