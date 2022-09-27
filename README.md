[![CodeQL](https://github.com/yoavain/lyricsify/workflows/CodeQL/badge.svg)](https://github.com/yoavain/lyricsify/actions?query=workflow%3ACodeQL)
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

## 🏃‍♂️ Getting Started

Run the following commands to start the project:
```bash
git clone ...
cd <your-project-name>
npm install
```

*The `electron` command in the `package.json` file is only used internally by the boilerplate to launch electron.*

## 🏗️ How to Build the Project

Run `npm run build`. This will create a `dist` folder with:

- A folder called `app-win32-ia32` containing the executable file
- A folder called `installer` containing the setup files to install the app

## 🌳 The Project Structure

- 📁 `public`: Holds all your public assets, such as styles, images or fonts. Also holds the `index.html`
- 📁 `scripts`: Holds the `start` and `build` script. This is where you can configure the setup
- 📂 `src`
    - 📁 `components`: A place to hold your React components
    - 📁 `electron`: Includes the start scripts for a `dev` and `prod` Electron build

  
