import * as React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import SelectFolderButton from "./SelectFolderButton";

interface LyricsCardProps {
    title?: string;
    artist?: string;
    lyrics?: string;
}

const prepareLyrics = (lyrics: string) => {
    return lyrics.split("\n").map((line, index) => <div key={index}>{line}</div>);
};

const LyricsCard = (props: LyricsCardProps) => {
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
                    {prepareLyrics(props.lyrics)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LyricsCard;