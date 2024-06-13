const express = require('express');
var router = express.Router();
const ImagesModel = require('../models/images.js');

// Display the member page
router.get("/", async function(req, res)
{
	req.TPL.user = req.session.username;
	var imgDB = await ImagesModel.getImageByUsername(req.session.username);
	// console.log(imgDB);
	if (imgDB.length > 0){ 
		req.TPL.mimeType = "image/jpg";
		req.TPL.based64 = Buffer.from(imgDB[0].image).toString('base64');;
	} 
	else{ req.TPL.image_message = "No Portrait to Display"; }
  	res.render("member", req.TPL);
}); 

// Delete the current user's image from the database
router.post("/delete", async function(req, res)
{	
	req.TPL.user = req.session.username;
	// Get the image data from database for the current user
	var imgDB = await ImagesModel.getImageByUsername(req.session.username);
	if (imgDB.length > 0){ 
		req.TPL.image_message = "No Portrait to Display";
		await ImagesModel.deleteImageByUsername(req.session.username);
		req.TPL.succeed_message = "Image successfully deleted!";
	} else {
		req.TPL.image_message = "No Portrait to Display";
	}
	res.render("member", req.TPL); 
});

// Upload an image if the form has been submitted
router.post("/upload", async function(req, res)
{	
	req.TPL.user = req.session.username;
	// Get the image data from database for the current user
	var imgDB = await ImagesModel.getImageByUsername(req.session.username);

	if (!req.files || Object.keys(req.files).length === 0) {
		if (imgDB.length > 0){ 
			req.TPL.mimeType = "image/jpg";
			req.TPL.based64 = Buffer.from(imgDB[0].image).toString('base64');;
		} else {
			req.TPL.image_message = "No Portrait to Display";
		}
		req.TPL.failed_message = "Please upload an image!";
		res.render("member", req.TPL);

	} else {
		// Get the image data from the form 
		var {name, data} = req.files.img;
		// Check if the database is empty
		if (imgDB.length > 0){ 
			// Update the image if it already exists
			await ImagesModel.updateImage(req.session.username, data);
		}
		else{
			// Upload the image if it does not exist
			await ImagesModel.uploadImage(req.session.username, data);
		}
		req.TPL.mimeType = "image/jpg";
		req.TPL.based64 = Buffer.from(data).toString('base64');;
		// Insert a message that has successfully been created and
		// display the member page again
		req.TPL.succeed_message = "Image successfully uploaded!";
		res.render("member", req.TPL);
	}
	
});

module.exports = router;
