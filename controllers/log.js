const express = require('express');
var router = express.Router()
const LogModel = require('../models/log.js');


// Display the home page
router.get("/", async function(req, res)
{
	let logs = await LogModel.getAllLogs();
	req.TPL.logs = logs;
	for (let i = 0; i < logs.length; i++){
		logs[i].time = new Date(logs[i].time).toString();
	}
	res.render("log", req.TPL); 
});

// Delete a log by id
router.get("/delete/:id", async function(req, res)
{
	let id = req.params.id;
	await LogModel.deleteLog(id);
	res.redirect("/log");
});

// Delete all logs
router.get("/deleteall", async function(req, res)
{
	await LogModel.deleteAllLogs();
	res.redirect("/log");
});

module.exports = router;