const path = require("path");
const sqlite3 = require("sqlite3");

// Get the location of the database file
const dbPath = path.resolve(__dirname, "./db/database.sqlite");

// Create a connection to the SQLite database
const db = new sqlite3.Database(dbPath, err => {
    if (err) {
        console.error("Could not connect to database", err);
    } else {
        console.log("Connected to database");
    }
});

// SQL code to create a table to store test stats
const createStatsTableSql = `
create table if not exists stats (
    id integer primary key autoincrement,
    num_correct integer,
    num_incorrect integer,
    total_questions integer,
    total_time integer,
    date_time datetime
);`;

// Create stats table
db.run(createStatsTableSql, err => {
    if (err) {
        console.error("Could not create stats table", err);
    } else {
        console.log("Created stats table or table already exists");
    }
});

// Log all data in the table, just for shits and giggles
db.all("select * from stats", (err, stats) => {
    if (err) {
        console.error("Could not get stats", err);
    } else {
        console.log(stats);
    }
});

// Export the database connection
module.exports = db;
