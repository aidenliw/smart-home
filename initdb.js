const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function(){

	// // Create an initial table of users
	// db.run("DROP TABLE IF EXISTS Users");
	// db.run("CREATE TABLE Users (username TEXT, password TEXT, level TEXT)");
	// db.run("INSERT INTO Users VALUES (?,?,?)", ['aiden', '123', 'admin']);
	// db.run("INSERT INTO Users VALUES (?,?,?)", ['ping', '123', 'admin']);
	// db.run("INSERT INTO Users VALUES (?,?,?)", ['jeff', '123', 'admin']);
	// db.run("INSERT INTO Users VALUES (?,?,?)", ['jukai', '123', 'admin']);
	// db.run("INSERT INTO Users VALUES (?,?,?)", ['member', '123', 'member']);

  	// // create an initial table of Portraits
	// db.run("DROP TABLE IF EXISTS Portraits");
	// db.run("CREATE TABLE Portraits (username TEXT, image TEXT)");
	// db.run("INSERT INTO Portraits VALUES (?,?)", 
	// 	["aiden", "Stringified image placeholder."]);
	// db.run("INSERT INTO Portraits VALUES (?,?)",
	// 	["ping","Stringified image placeholder."]);
	// db.run("INSERT INTO Portraits VALUES (?,?)",
	// 	["member","Stringified image placeholder."]);

	// create an initial table of Portraits
	db.run("DROP TABLE IF EXISTS Log");
	db.run("CREATE TABLE Log (time INTEGER, log TEXT)");
	// get the current time in milliseconds
	var time = new Date().getTime();
	db.run("INSERT INTO Log VALUES (?,?)", 
		[time, "Database initialized."]);
});
