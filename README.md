[![codecov](https://codecov.io/gh/yoavain/lyricsify/branch/master/graph/badge.svg)](https://codecov.io/gh/yoavain/lyricsify)
# lyricsify

[WIP]

Player and lyrics

This is an audio player, that:
1. Parses and shows lyrics embedded in files
2. Fetches missing lyrics from various lyrics providers
3. (Optionally) embeds lyrics in file

Lyrics providers:
1. apiseeds.com (requires API token)   

## Install
Clone the repository with Git:

```bash
git clone ...
```

And then install the dependencies:

```bash
cd <your-project-name>
npm install
```

## Usage
Both processes have to be started **simultaneously** in different console tabs:

```bash
npm run start-renderer-dev
npm run start-main-dev
```

This will start the application with hot-reload so you can instantly start developing your application.

You can also run do the following to start both in a single process:

```bash
npm run start-dev
```

## Packaging
We use [Electron builder](https://www.electron.build/) to build and package the application. By default you can run the following to package for your current platform:

```bash
npm run dist
```

This will create a installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using the options found [here](https://www.electron.build/cli). E.g. building for all platforms (Windows, Mac, Linux):

```bash
npm run dist -- -mwl
```
