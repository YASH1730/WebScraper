const router = require('express').Router();
const component  = require('./Controller/Controller')

router.get("/course",component.scrapedData);
router.get("/query",component.queryData);
router.get("/",component.greet);
module.exports= router;