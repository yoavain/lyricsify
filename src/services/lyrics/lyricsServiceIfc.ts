export type LyricsResult = {
    result: {
        artist: {
            name: string
        },
        track: {
            name: string
            text: string
            lang: {
                code: string
                name?: string
            }
        },
        copyright: {
            notice: string
            artist?: string
            text: string
        },
        probability?: number
        similarity?: number
    }
}

export type GetLyricsService = (artist: string, track: string) => Promise<LyricsResult>
