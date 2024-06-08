const express = require('express');
var router = express.Router()
const UsersModel = require('../models/users.js')
const ImagesModel = require('../models/images.js')

// Display the admin page
router.get("/", async function(req, res)
{
	let users = await UsersModel.getAllUsers();
	req.TPL.users = users;
	let images = await ImagesModel.getAllImages();
	for (let i = 0; i < images.length; i++){
		images[i].mimeType = "image/jpg";
		images[i].based64 = Buffer.from(images[i].image).toString('base64');;
	}
	req.TPL.images = images;
	res.render("admin", req.TPL);
});

// Delete user by username with the associated image
router.get("/delete/user/:id", async function(req, res)
{
	let user_data = await UsersModel.getUsersByID(req.params.id); 
	await UsersModel.deleteUserByID(user_data[0].id);
	await ImagesModel.deleteImageByUsername(user_data[0].username);
	res.redirect("/admin"); 
});

// Delete user by username with the associated image
router.get("/delete/image/:id", async function(req, res)
{
	await ImagesModel.deleteImageByID(req.params.id);
	res.redirect("/admin"); 
});
 

module.exports = router;
