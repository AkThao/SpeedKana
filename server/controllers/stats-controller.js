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
            console.log(stats);
            res.json(stats);
        }
    });
}

exports.createTest = (req, res) => {
    // Store test stats in database
    // SQL code to store test stats
    const createStatsSql = `
    insert into stats (num_correct, num_incorrect, total_questions, total_time, date_time)
    values (${req.body.num_correct}, ${req.body.num_incorrect}, ${req.body.total_questions}, ${req.body.total_time}, datetime('now'));`;

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