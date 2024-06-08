const express = require('express');
var router = express.Router()

// Display the about page
router.get("/", async function(req, res)
{
    res.render("about", req.TPL);

});

module.exports = router;
