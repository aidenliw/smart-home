const express = require('express');
var router = express.Router()
const PubNubModel = require('../models/pubnub.js');
const LogModel = require('../models/log.js')

let currentDegree = 45;

// Display the home page
router.get("/", async function(req, res)
{
    // Initialize the camera angle to 45 degrees
    req.TPL.degree = currentDegree;
	res.render("camera", req.TPL);
});

router.post("/activate", async function(req, res)
{	
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "command";
    let description = "activate";
    var status = await PubNubModel.publishMessage(channel, title, description);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Camera Auto-Tracking Activated!";
        // create a log
        let log = req.session.username + " enables camera automatic tracking.";
        await LogModel.createLog(log);
    } else {
        req.TPL.failed_message = "Activating camera failed! Please try again later.";
    }
    req.TPL.degree = currentDegree;
	res.render("camera", req.TPL); 
});

router.post("/deactivate", async function(req, res)
{	
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "command";
    let description = "deactivate";
    var status = await PubNubModel.publishMessage(channel, title, description);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Camera Auto-Tracking Deactivated!";
        // create a log
        let log = req.session.username + " disables camera automatic tracking.";
        await LogModel.createLog(log);
    } else {
        req.TPL.failed_message = "Deactivating camera failed! Please try again later.";
    }
    req.TPL.degree = currentDegree;
	res.render("camera", req.TPL); 
});

router.post("/:direction", async function(req, res)
{	
    const direction = req.params.direction;
    const degree = req.body.degree;
    currentDegree = degree; // update the current degree
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "command";
    let description = direction + " " + degree;
    var status = await PubNubModel.publishMessage(channel, title, description);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Camera Moving "+ description +" degree!";
    } else {
        req.TPL.failed_message = "Adjust camera angle failed! Please try again later.";
    }
    req.TPL.degree = currentDegree;
	res.render("camera", req.TPL); 
});

module.exports = router;