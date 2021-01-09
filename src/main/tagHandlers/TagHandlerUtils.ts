import * as fs from "fs";
import * as path from "path";

const fsPromises = fs.promises;

const BACKUP_DIR = "_backup";

/**
 * Backup original file (if not already backed-up)
 * @param inFile input file
 */
export const backupOriginalFile = async (inFile: string): Promise<void> => {
    const parsedFile: path.ParsedPath = path.parse(inFile);
    const backupDir: string = path.join(parsedFile.dir, BACKUP_DIR);
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }
    const backupFile = path.join(backupDir, parsedFile.base);
    if (!fs.existsSync(backupFile)) {
        await fsPromises.copyFile(inFile, backupFile);
    }
};

export const restoreOriginalFile = async (inFile: string): Promise<void> => {
    const parsedFile: path.ParsedPath = path.parse(inFile);
    const backupDir: string = path.join(parsedFile.dir, BACKUP_DIR);
    if (!fs.existsSync(backupDir)) {
        throw new Error("Backup folder does not exist");
    }
    const backupFile = path.join(backupDir, parsedFile.base);
    if (fs.existsSync(backupFile)) {
        await fsPromises.copyFile(backupFile, inFile);
    }
    else {
        throw new Error("Backup file does not exist");
    }

};
