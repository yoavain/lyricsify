import knex from "knex";

export const development: knex.Config = {
    debug: true,
    client: "sqlite3",
    connection: {
        filename: "./dev.sqlite3"
    },
    useNullAsDefault: true
};

export const test: knex.Config = {
    debug: true,
    client: "sqlite3",
    connection: {
        filename: ":memory:"
    },
    seeds: {
        directory: "./tests/seeds"
    }
}; 
