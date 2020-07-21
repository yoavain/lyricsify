import knex from "knex";

export const knexClient = knex({
    client: "sqlite3",
    connection: {
        filename: "../../../resources/db/lyrics.sqlite3"
    }
});

