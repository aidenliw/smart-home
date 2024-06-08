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

// Return all of the portraits
async function getAllImages()
{
	let results = await db.all("SELECT rowid as id, * FROM Portraits");
	return results;
}

// Return all of the portraits
async function getImageByUsername(username)
{
	let results = await db.all("SELECT * FROM Portraits WHERE username=?",[username]);
	return results;
}

// Upload a new portraits given a username and image
async function uploadImage(username, image)
{
  	await db.run("INSERT INTO Portraits VALUES (?,?)",
	  [username, image]);
}

// Update a new portraits given a username and image
async function updateImage(username, image)
{
  	await db.run("UPDATE Portraits SET image=? WHERE username=?",
	  [image, username]);
}

async function deleteImageByID(id)
{
	await db.all("DELETE FROM Portraits WHERE rowid=?",
    [id]);
}

async function deleteImageByUsername(username)
{
	await db.all("DELETE FROM Portraits WHERE username=?",
    [username]);
}

module.exports = {
	getAllImages,
	getImageByUsername,
	uploadImage,
	updateImage,
	deleteImageByID,
	deleteImageByUsername
};
