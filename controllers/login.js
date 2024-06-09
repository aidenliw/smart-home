const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');
const LogModel = require('../models/log.js');

// Displays the login page
router.get("/", async function(req, res)
{
	// if we had an error during form submit, display it, clear it from session
	req.TPL.login_error = req.session.login_error;
	req.session.login_error = "";

	// render the login page
	res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
	// Login by stored data in the database
	var input_username = req.body.username;
	var input_password = req.body.password;
	var data = await UsersModel.checkCredentials(input_username,input_password);

	if (data.length > 0){
		// req.TPL.username = req.body.username;
		if (data[0].level == "member"){
			req.session.username = req.body.username;
			req.session.access_level = "member";

			// re-direct the logged-in user to the member page
			res.redirect("/member");
		}
		else if (data[0].level == "admin"){
			req.session.username = req.body.username;
			req.session.access_level = "admin";
	
			// re-direct the logged-in user to the admin page
			res.redirect("/admin");
		}
	}
	else
	{
		// if we have an error, reload the login page with an error
		req.session.login_error = "Invalid username and/or password!";
		res.redirect("/login");
	}
});

// Displays the sign up page
router.get("/signup", async function(req, res)
{
	// if we had an error during form submit, display it, clear it from session
	req.TPL.signup_error = req.session.signup_error;
	req.session.signup_error = "";
	req.TPL.signup_success = req.session.signup_success;
	req.session.signup_success = false;
	
	// render the sign-up page
	res.render("signup", req.TPL); 
});

// Attempts to sign-up a user
// - The action for the form submit on the sign-up page.
router.post("/attemptsignup", async function(req, res)
{
	var input_username = req.body.username;
	var input_password = req.body.password;
	var check_username = await UsersModel.checkUsername(input_username);
	if (check_username.length > 0){
		req.session.signup_error = "Username already exists, try another one!";
		res.redirect("/login/signup");
	}
	else{
		if (input_username.length <= 0 || input_password <= 0){
			req.session.signup_error = "Username/password cannot be blank!";
			res.redirect("/login/signup");
		}
		else {
			await UsersModel.createUser(input_username,input_password);
			req.session.signup_success = true;
			// create a log
			let log = input_username + " has signed up an account.";
			await LogModel.createLog(log);
			res.redirect("/login/signup");
		}
	}
});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
	// reset the template obect to a blank object
	delete(req.session.access_level);
	delete(req.session.username);
	res.redirect("/home");
});

module.exports = router;
