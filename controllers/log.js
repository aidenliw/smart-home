const express = require('express');
var router = express.Router()
const LogModel = require('../models/log.js');


// Display the home page
router.get("/", async function(req, res)
{
	let logs = await LogModel.getAllLogs();
	req.TPL.logs = logs;
	console.log(req.TPL.logs);
	for (let i = 0; i < logs.length; i++){
		logs[i].time = new Date(logs[i].time).toString();
	}
	res.render("log", req.TPL); 
});

module.exports = router;