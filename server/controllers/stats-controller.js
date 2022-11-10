// Import database
const db = require("./../db");

// Retrieve all test stats
exports.getAllTests = (req, res) => {
    // Retrieve all test stats from database
    // SQL code to retrieve all test stats
    const getStatsSql = `
    select * from stats;`;

    // Run the SQL code
    db.all(getStatsSql, (err, stats) => {
        if (err) {
            console.error("Could not get stats", err);
            res.json({ message: `There was an error retrieving test stats. Error: ${err}` });
        } else {
            console.log(`Got ${stats.length} stat${stats.length != 1 ? "s" : ""}`);
            res.json(stats);
        }
    });
}

exports.getLatestTest = (req, res) => {
    // Retrieve last test stats from database
    // SQL code to retrieve last test stats
    const getLastStatsSql = `
    select * from stats order by id desc limit 1;`;

    // Run the SQL code
    db.all(getLastStatsSql, (err, stats) => {
        if (err) {
            console.error("Could not get latest test stats", err);
            res.json({ message: `There was an error retrieving latest test stats. Error: ${err}` });
        } else {
            console.log(`Got latest test stats`);
            res.json(stats);
        }
    })
}

exports.createTest = (req, res) => {
    // Store test stats in database
    // SQL code to store test stats
    const createStatsSql = `
    insert into stats (num_correct, num_incorrect, total_questions, total_time, date_time)
    values (${req.body.num_correct}, ${req.body.num_incorrect}, ${req.body.total_questions}, ${req.body.total_time}, datetime('now'));`;

    // Run the SQL code
    db.run(createStatsSql, err => {
        if (err) {
            console.error("Could not create stats", err);
            res.json({ message: `There was an error storing test stats. Error: ${err}` });
        } else {
            console.log("Created stats");
            res.json({ message: "Test stats stored successfully" });
        }
    });
}

exports.deleteTest = (req, res) => {
    // Delete test stats from database
    // SQL code to delete test stats
    const deleteStatsSql = `
    delete from stats
    where id = ${req.body.id};`;

    // Run the SQL code
    db.run(deleteStatsSql, err => {
        if (err) {
            console.log("Could not delete stats", err);
            res.json({ message: `There was an error deleting test stats. Error: ${err}` });
        } else {
            console.log("Deleted stats");
            // Return new table once record has been deleted
            db.all(`select * from stats;`, (err, stats) => {
                if (err) {
                    console.error("Could not get stats", err);
                    res.json({ message: `There was an error retrieving test stats. Error: ${err}`});
                } else {
                    // Restart ID counter if all tests are deleted
                    if (stats.length == 0) {
                        db.run(`update sqlite_sequence set seq=0 where name="stats"`, err => {
                            if (err) {
                                console.error("Could not reset ID counter", err);
                            } else {
                                console.log("Reset ID counter");
                            }
                        })
                    }
                    console.log(`Got ${stats.length} stat${stats.length != 1 ? "s" : ""}`);
                    res.json(stats);
                }
            });
        }
    });
}
