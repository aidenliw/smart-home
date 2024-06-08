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

// Login by stored data in the database
async function checkCredentials(username, password)
{
    let result = await db.all("SELECT * FROM Users WHERE username=? AND password=?",
    [username, password]);
    return result;
}

// Attempts to sign-up a user
async function createUser(username, password)
{
    await db.run("INSERT INTO Users VALUES (?,?,?)",
    [username, password, "member"]);
}

// Check the username is exists in the database
async function checkUsername(username)
{
    let result = await db.all("SELECT * FROM Users WHERE username=?",
    [username]);
    return result;
}

// Admin Page functionality
async function getAllUsers()
{
    let result = await db.all("SELECT rowid as id, * FROM Users");
    return result;
}

async function getUsersByID(id)
{
    let result = await db.all("SELECT rowid as id, * FROM Users WHERE rowid=?",
	[id]);
    return result;
}

async function deleteUserByID(id)
{
    await db.all("DELETE FROM Users WHERE rowid=?",
    [id]);
}

module.exports = {
    checkCredentials,
    checkUsername,
    createUser,
    getAllUsers,
	getUsersByID,
	deleteUserByID
};
