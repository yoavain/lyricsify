import knex from "knex";
import path from "path";
// eslint-disable-next-line no-unused-vars
import sqlite3 from "sqlite3";

export const development: knex.Config = {
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, "dev.sqlite3")
    },
    useNullAsDefault: true
};

export const test: knex.Config = {
    client: "sqlite3",
    connection: {
        filename: ":memory:"
    },
    seeds: {
        directory: "./tests/seeds"
    }
}; 
