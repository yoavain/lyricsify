export interface TagHandlerInterface {
    addLyrics: (inFile: string, lyrics: string) => Promise<void>
}

