export interface RowData {
    filename: string;
    path: string;
    tag: string;
    title: string;
    artist: string;
    album: string;
    track: number;
    year: number;
    length: number;
    size: number;
    lastModified: number;
    hasLyrics: boolean;
}


function createData(filename: string, path: string, tag: string, title: string, artist: string, album: string, track: number, year: number, length: number, size: number, lastModified: number, hasLyrics: boolean = false): RowData {
    return { filename, path, tag, title, artist, album, track, year, length, size, lastModified, hasLyrics };
}

export const rows = [
    createData("01 - Happens To The Heart.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Happens To The Heart", "Leonard Cohen", "Thanks For The Dance", 1, 2019, 273, 22749256, 1574467200000),
    createData("02 - Moving On.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Moving On", "Leonard Cohen", "Thanks For The Dance", 2, 2019, 192, 14556156, 1574467200000),
    createData("03 - The Night of Santiago.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "The Night of Santiago", "Leonard Cohen", "Thanks For The Dance", 3, 2019, 255, 20998200, 1574467200000),
    createData("04 - Thanks For The Dance.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Thanks For The Dance", "Leonard Cohen", "Thanks For The Dance", 4, 2019, 253, 18920215, 1574467200000),
    createData("05 - It's Torn.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "It's Torn", "Leonard Cohen", "Thanks For The Dance", 5, 2019, 178, 13998876, 1574467200000),
    createData("06 - The Goal.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "The Goal", "Leonard Cohen", "Thanks For The Dance", 6, 2019, 72, 5576134, 1574467200000),
    createData("07 - Puppets.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Puppets", "Leonard Cohen", "Thanks For The Dance", 7, 2019, 160, 12369996, 1574467200000),
    createData("08 - The Hills.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "The Hills", "Leonard Cohen", "Thanks For The Dance", 8, 2019, 258, 25574353, 1574467200000),
    createData("09 - Listen To The Hummingbird.flac", "D:\\Music\\Leonard Cohen\\2019 - Thanks For The Dance\\", "FLAC", "Listen To The Hummingbird", "Leonard Cohen", "Thanks For The Dance", 9, 2019, 121, 7459732, 1574467200000)
];