const express = require('express');
const app = express();
const port = 8081;
const path = require('path');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fileUpload = require('express-fileupload');
const fs = require('fs'); 
require('dotenv').config()
// console.log(process.env)

// Include the mustache engine to help us render our pages
app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// We use the .urlencoded middleware to process form data in the request body,
// which is something that occurs when we have a POST request.
app.use(express.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(fileUpload());

// Use the session middleware
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized:false
}));

// Create a middleware to populate an initial template array
app.use(function(req,res,next) {

	// reset the template obect to a blank object on each request
	req.TPL = {};
	
	// decide whether to display the login or logout button in the navbar
	req.TPL.displaylogin = !req.session.username
	req.TPL.displaylogout = req.session.username
	if (req.session.access_level == "admin"){ req.TPL.adminsacc = true; }
	if (req.session.access_level == "member"){ req.TPL.membersacc = true; }
	next();
});

// Create a middleware to generate the log data, and store the data into log.txt
app.use((req, res, next) => {
	var log_data = [];
	log_data.push(new Date().toString());
	log_data.push(req.path);
	log_data.push(req.ip);
	log_data.push(JSON.stringify(req.query));
	log_data.push(JSON.stringify(req.body));
	fs.appendFile("log.txt", log_data.join(",") + "\r\n", function(err){
		if (err) throw err;
	})
	next();
});

// Create middlewares for setting up navigational highlighting
app.use("/home", function(req,res,next) {req.TPL.homenav = true; next(); });
app.use("/about", function(req,res,next) { req.TPL.aboutnav = true; next();});
app.use("/member", function(req,res,next) { req.TPL.membersnav = true; next(); });
app.use("/admin", function(req,res,next) { req.TPL.adminsnav = true; next(); });
app.use("/login", function(req,res,next) { req.TPL.loginnav = true; next(); });
app.use("/door", function(req,res,next) { req.TPL.doornav = true; next();});
app.use("/camera", function(req,res,next) { req.TPL.cameranav = true; next();});
app.use("/log", function(req,res,next) { req.TPL.lognav = true; next();});

// protect access to the members, door, and camera pages, 
// re-direct user to home page if nobody is logged in...
app.use(["/member", "/door", "/camera"], function(req,res,next) {
	if (req.session.username) next();
	else res.redirect("/home");
});

// protect access to the admin and log pages, re-direct user to home page if nobody is a admin
app.use(["/admin", "/log"], function(req,res,next) {
	if (req.session.access_level == "admin") next();
	else if (req.session.access_level == "member") res.redirect("/member");
	else res.redirect("/home");
});

// Define all of our routes inside our controllers, and include them in main app script.
app.use("/home", require("./controllers/home"));
app.use("/about", require("./controllers/about"));
app.use("/member", require("./controllers/member"));
app.use("/admin", require("./controllers/admin"));
app.use("/login", require("./controllers/login"));
app.use("/door", require("./controllers/door"));
app.use("/camera", require("./controllers/camera"));
app.use("/log", require("./controllers/log"));

// Route / to redirect to /home by default
app.get("/", function(req, res) {
 	res.redirect("/home");
});

// Catch-all router case
app.get(/^(.+)$/, function(req,res) {
  	res.sendFile(__dirname + req.params[0]);
});

// Start the server
app.listen(process.env.PORT || port, function() {
	console.log(`Server listening at http://localhost:${port}`);
})