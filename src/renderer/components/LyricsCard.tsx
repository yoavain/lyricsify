import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { getLyrics } from "~src/main/lyrics/providers/cacheLyricsService";
import { LyricsResult } from "~src/main/lyrics/lyricsServiceIfc";

interface LyricsCardProps {
    title?: string;
    artist?: string;
    lyrics?: string;
}

const prepareLyrics = (lyrics: string | undefined) => {
    if (!lyrics) {
        return <div>[Missing Lyrics]</div>;
    }

    return lyrics.split("\n").map((line, index) => <div key={index}>{line}</div>);
};

const LyricsCard = (props: LyricsCardProps) => {
    console.log(`Rendering LyricsCard ${JSON.stringify({ ...props, lyrics: !!props.lyrics })}`);
    const [internetLyrics, setInternetLyrics] = useState<string>("");
    
    useEffect(() => {
        if (!props.lyrics) {
            getLyrics(props.artist, props.title)
                .then((lyricsResult: LyricsResult) => {
                    const lyrics: string = lyricsResult?.result?.track?.text;
                    if (lyrics) {
                        setInternetLyrics(lyrics);
                    }
                });
        }
    }, [props.artist, props.title]);
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h2">
                    {props.title} - Lyrics
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.artist}
                </Typography>
                <Typography variant="h6" component="h2">
                    {prepareLyrics(props.lyrics || internetLyrics)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LyricsCard;