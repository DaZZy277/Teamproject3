const express = require("express");
const { connectDB } = require("../connect-to-database/database");

const router = express.Router();

async function hello(req, res) {
    res.send("Hello World!555111");
}
//console
// Routes
router.get("/", hello);

module.exports = router;
