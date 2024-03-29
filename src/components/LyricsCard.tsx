import type { FC } from "react";
import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { getLyrics } from "../services/lyrics/providers/cacheLyricsService";
import type { LyricsResult } from "../services/lyrics/lyricsServiceIfc";

interface LyricsCardProps {
    title?: string;
    artist?: string;
    lyrics?: string;
    gotLyricsFromInternetCallback?: (lyrics: string) => void
}

const prepareLyrics = (lyrics: string | undefined) => {
    if (!lyrics) {
        return <div>[Missing Lyrics]</div>;
    }

    return lyrics.split("\n").map((line, index) => <div key={index}>{line}</div>);
};

export const LyricsCard: FC<LyricsCardProps> = (props: LyricsCardProps) => {
    const { artist, title, lyrics, gotLyricsFromInternetCallback } = props;

    useEffect(() => {
        if (!lyrics) {
            getLyrics(artist, title)
                .then((lyricsResult: LyricsResult) => {
                    const lyrics: string = lyricsResult?.result?.track?.text;
                    if (lyrics) {
                        if (typeof gotLyricsFromInternetCallback === "function") {
                            gotLyricsFromInternetCallback(lyrics);
                        }
                    }
                });
        }
    }, [artist, title]);
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h2">
                    {title} - Lyrics
                </Typography>
                <Typography variant="h5" component="h2">
                    {artist}
                </Typography>
                <Typography variant="h6" component="h2">
                    {prepareLyrics(lyrics)}
                </Typography>
            </CardContent>
        </Card>
    );
};
