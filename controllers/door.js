const express = require('express');
var router = express.Router()

// Display the home page
router.get("/", async function(req, res)
{
	res.render("door", req.TPL);
});

module.exports = router;