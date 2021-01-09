import type { TagHandlerInterface } from "~src/main/tagHandlers/TagHandlerInterface";
import { Mp3TagHandler } from "~src/main/tagHandlers/Mp3TagHandler";

export const tagHandlerFactory = (inFile: string): TagHandlerInterface => {
    const extension: string = inFile.toLowerCase().split(".").pop();
    switch (extension) {
        case "mp3": {
            return Mp3TagHandler;
        }
        default: {
            return {
                addLyrics: async (inFile: string) => {
                    // do nothing
                    console.warn(`No handler for ${extension}`);
                }
            };
        }
    }
};
