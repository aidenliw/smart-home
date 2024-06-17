const express = require('express');
var router = express.Router()
const PubNubModel = require('../models/pubnub.js');
const LogModel = require('../models/log.js')

let currentDegree = 5;

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
    let title = "camera";
    let command = "activate";
    let message = { title: title, command: command }
    var status = await PubNubModel.publishMessage(channel, message);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Camera Auto-Tracking Activated!";
        req.TPL.green = true;
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
    let title = "camera";
    let command = "deactivate";
    let message = { title: title, command: command }
    var status = await PubNubModel.publishMessage(channel, message);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Camera Auto-Tracking Deactivated!";
        req.TPL.red = true;
        // create a log
        let log = req.session.username + " disables camera automatic tracking.";
        await LogModel.createLog(log);
    } else {
        req.TPL.failed_message = "Deactivating camera failed! Please try again later.";
    }
    req.TPL.degree = currentDegree;
	res.render("camera", req.TPL); 
});

router.post("/initialize", async function(req, res)
{	
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "camera";
    let command = "initialize";
    let message = { title: title, command: command }
    var status = await PubNubModel.publishMessage(channel, message);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Camera Angel Initialized!";
        req.TPL.blue = true;
        // create a log
        let log = req.session.username + " initializes camera angel.";
        await LogModel.createLog(log);
    } else {
        req.TPL.failed_message = "Initializing camera angel failed! Please try again later.";
    }
    req.TPL.degree = currentDegree;
	res.render("camera", req.TPL); 
});

router.post("/:direction", async function(req, res) 
{    
    const direction = req.params.direction;
    const degree = req.body.degree;
    console.log(degree);
    currentDegree = degree; // update the current degree
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "camera";
    let message = { title: title, command: direction, degree: degree };
    var status = await PubNubModel.publishMessage(channel, message);
    
    if (!status.error && status.statusCode === 200){
        res.json({ success: true, message: `Camera Moving ${direction} ${degree} degree!` });
    } else {
        res.status(500).json({ success: false, message: "Adjust camera angle failed! Please try again later." });
    }
    req.TPL.degree = currentDegree;
});

module.exports = router;