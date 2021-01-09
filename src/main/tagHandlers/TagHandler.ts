import { backupOriginalFile, restoreOriginalFile } from "~src/main/tagHandlers/TagHandlerUtils";
import { tagHandlerFactory } from "~src/main/tagHandlers/TagHandlerFactory";

export interface TagHandlerInterface {
    addLyrics: (inFile: string, lyrics: string) => Promise<void>
    getLyrics: (inFile: string) => Promise<string>
}

export const addLyrics = async (inFile: string, lyrics: string): Promise<void> => {
    // Backup
    await backupOriginalFile(inFile);

    const handler: TagHandlerInterface = tagHandlerFactory(inFile);

    try {
        await handler.addLyrics(inFile, lyrics);

        // Validate
        const savedLyrics: string = await handler.getLyrics(inFile);
        if (savedLyrics !== lyrics) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("Failed to update lyrics");
        }
        console.log("Lyrics updated successfully");
    }
    catch (e) {
        // Rollback
        console.error("Failed to update lyrics. Restoring original file");
        await restoreOriginalFile(inFile);
    }
};
