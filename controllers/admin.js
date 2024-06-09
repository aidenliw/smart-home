const express = require('express');
var router = express.Router()
const UsersModel = require('../models/users.js')
const ImagesModel = require('../models/images.js')
const LogModel = require('../models/log.js')

// Display the admin page
router.get("/", async function(req, res)
{
	// Get all users
	let users = await UsersModel.getAllUsers();
	
	// List of all possible levels
	const allLevels = ['admin', 'member'];
	const preparedUsers = users.map(user => {
		const otherLevels = allLevels.filter(level => level !== user.level);
		return {
			...user,
			otherLevels: otherLevels,
			isCurrentUser: user.username === req.session.username
		};
	});
	req.TPL.users = preparedUsers;

	// Get all images
	let images = await ImagesModel.getAllImages();
	for (let i = 0; i < images.length; i++){
		images[i].mimeType = "image/jpg";
		images[i].based64 = Buffer.from(images[i].image).toString('base64');;
	}
	req.TPL.images = images;

	res.render("admin", req.TPL);
});

// Update user level by username
router.post("/update", async function(req, res)
{	
	let adminname = req.session.username;
	// let username = req.params.username;
	let level = req.body.level;
	let username = req.body.username;
	await UsersModel.updateUserLevel(username, level);
	// Create a log
	let log = adminname + " updated user " + username + " to " + level;
	await LogModel.createLog(log);
	res.redirect("/admin");
});

// Delete user by username with the associated image
router.get("/delete/user/:id", async function(req, res)
{
	let user_data = await UsersModel.getUsersByID(req.params.id); 
	await UsersModel.deleteUserByID(user_data[0].id);
	await ImagesModel.deleteImageByUsername(user_data[0].username);
	// Create a log
	let log = req.session.username + " deleted user " + user_data[0].username;
	await LogModel.createLog(log);
	res.redirect("/admin"); 
});

// Delete user's image by id
router.get("/delete/image/:id", async function(req, res)
{
	await ImagesModel.deleteImageByID(req.params.id);
	res.redirect("/admin"); 
});
 

module.exports = router;
