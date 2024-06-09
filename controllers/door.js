const express = require('express');
var router = express.Router()
const PubNubModel = require('../models/pubnub.js');
const LogModel = require('../models/log.js')

// Display the home page
router.get("/", async function(req, res)
{
	res.render("door", req.TPL);
});

router.post("/unlock", async function(req, res)
{	
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "command";
    let description = "unlock";
    var status = await PubNubModel.publishMessage(channel, title, description);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Door Unlocked!";
        // create a log
        let log = req.session.username + " unlocked the door";
        await LogModel.createLog(log);
    } else {
        req.TPL.failed_message = "Unlocking door failed! Please try again later.";
    }
	res.render("door", req.TPL); 
});

router.post("/lock", async function(req, res)
{	
    let channel = process.env.PUBNUB_CHANNEL;
    let title = "command";
    let description = "lock";
    var status = await PubNubModel.publishMessage(channel, title, description);
    // console.log(status);
    // check if the status is successful
    if (!status.error && status.statusCode === 200){
        req.TPL.succeed_message = "Door Locked!";
        // create a log
        let log = req.session.username + " locked the door";
        await LogModel.createLog(log);
    } else {
        req.TPL.failed_message = "Locking door failed! Please try again later.";
    }
	res.render("door", req.TPL); 
});

module.exports = router;