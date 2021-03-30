[![Total alerts](https://img.shields.io/lgtm/alerts/g/yoavain/lyricsify.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/yoavain/lyricsify/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/yoavain/lyricsify.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/yoavain/lyricsify/context:javascript)
[![Actions Status](https://github.com/yoavain/lyricsify/workflows/Node%20CI/badge.svg)](https://github.com/yoavain/lyricsify/actions)
![types](https://img.shields.io/npm/types/typescript.svg)
![commit](https://img.shields.io/github/last-commit/yoavain/lyricsify.svg)
[![Known Vulnerabilities](https://snyk.io//test/github/yoavain/lyricsify/badge.svg?targetFile=package.json)](https://snyk.io//test/github/yoavain/lyricsify?targetFile=package.json)
[![codecov](https://codecov.io/gh/yoavain/lyricsify/branch/main/graph/badge.svg)](https://codecov.io/gh/yoavain/lyricsify)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
![visitors](https://visitor-badge.glitch.me/badge?page_id=yoavain.lyricsify)
# Lyricsify -  Player & lyrics

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
