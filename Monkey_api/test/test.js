const express = require("express");
const { connectDB } = require("../connect-to-database/database");

const router = express.Router();

async function hello(req, res) {
    res.send('223')
    
}

async function test(req, res) {
    // res.send("222");
    console.log(req.body)
    res.json({message: "Hello"})
}

async function test2(req, res) {
    // res.send("222");
    console.log(req.body)
    res.json({message: "Hello"})
}

// Routes
router.get("/lol", hello);
router.post("/regdata", test);
router.post("/logindata", test2);
router.post("/resultsave", test);

module.exports = router;
