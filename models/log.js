const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() 
{
	try {
		db = await sqlite.open({
			filename: 'database.db',
			driver: sqlite3.Database
		});
	} catch(err) {
		console.error(err);
	}
}

init();

// Return all of the logs
async function getAllLogs()
{
	let results = await db.all("SELECT rowid as id, * FROM Log ORDER BY time DESC");
	return results;
}

// Save a log
async function createLog(log)
{
	// Get current time in milliseconds
	var time = new Date().getTime();
	await db.run("INSERT INTO Log VALUES (?,?)", 
		[time, log]);
}

// Delete a log by id
async function deleteLog(id)
{
	await db.run("DELETE FROM Log WHERE rowid = ?", id);
}

// Delete all logs
async function deleteAllLogs()
{
	await db.run("DELETE FROM Log");
}

module.exports = {
	getAllLogs,
	createLog,
	deleteLog,
	deleteAllLogs
};
