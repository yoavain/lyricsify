import { Mp3TagHandler } from "./Mp3TagHandler";
import { FlacTagHandler } from "./FlacTagHandler";
import type { TagHandlerInterface } from "./TagHandler";

export const tagHandlerFactory = (inFile: string): TagHandlerInterface => {
    const extension: string = inFile.toLowerCase().split(".").pop();
    switch (extension) {
        case "mp3": {
            return Mp3TagHandler;
        }
        case "flac": {
            return FlacTagHandler;
        }
        default: {
            return {
                addLyrics: async (inFile: string) => {
                    console.warn(`No handler for ${extension}`);
                },
                getLyrics: (inFile: string) => undefined
            };
        }
    }
};
