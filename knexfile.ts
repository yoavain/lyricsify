import path from "path";
import type { Config } from "knex";

export const development: Config = {
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, "dev.sqlite3")
    },
    useNullAsDefault: true
};

export const test: Config = {
    client: "sqlite3",
    connection: {
        filename: ":memory:"
    },
    seeds: {
        directory: "./tests/seeds"
    }
}; 
