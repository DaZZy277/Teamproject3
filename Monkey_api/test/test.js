const express = require("express");
const { connectDB } = require("../connect-to-database/database");

const router = express.Router();

// Hello route for testing purposes
async function hello(req, res) {
    res.send('223')
}

// Save result data into the database
async function resultsave(req, res) {
    try {
        const { Money_input, Year_input, Result, Percentage, email } = req.body;
        const date = new Date().toLocaleDateString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const db = await connectDB();
        const collection = await db.collection("archivecollections");
        await collection.insertOne({ email, Money_input, Year_input, Result, Percentage, date });
        res.status(200).json({ message: "Data saved" });
        console.log("Data saved");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error saving data" });
    }
}

// Check login or register a user
async function checkLoginRegister(req, res) {
    try {
        const db = await connectDB();
        const { email, pass, confirmpass } = req.body;

        if (!confirmpass) {
            // Login
            const checkLogin = await db.collection("loginregistercollections").findOne({ email });
            if (!checkLogin || checkLogin.pass !== pass) {
                return res.status(400).json({ error: "Invalid username or password" });
            }
            res.status(200).json({ message: "Login successful" });
        } else {
            // Register
            const existingUser = await db.collection("loginregistercollections").findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }
            await db.collection("loginregistercollections").insertOne({ email, pass });
            res.status(200).json({ message: "User created successfully" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error processing request" });
    }
}

// Fetch results for a user based on email
async function getResults(req, res) {
    try {
        const { email } = req.query; // Get email from query params

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const db = await connectDB();
        const results = await db.collection("archivecollections").find({ email }).toArray();

        if (results.length === 0) {
            return res.status(404).json({ message: "No results found for this email" });
        }

        res.status(200).json(results); // Send the results back to the client
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: "Error fetching results" });
    }
}

async function deleteResult(req, res) {
    try {
        console.log("Delete ID:", req.params.id);
        const { id } = req.params.id; // Get the result ID from the request params

        const db = await connectDB();
        const collection = await db.collection("archivecollections");

        // // Delete the result by its ID
        await collection.deleteOne({ id });

        
        res.status(200).json({ message: "Result deleted successfully" });
    } catch (error) {
        console.error("Error deleting result:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Add the route for deleting results
router.delete('/results/:id', deleteResult);

// Routes
router.get("/lol", hello);
router.post("/regdata", checkLoginRegister);
router.post("/logindata", checkLoginRegister);
router.post("/resultsave", resultsave);
router.post('/results/:id', deleteResult);

// New route to fetch results by user email
router.get("/results", getResults);

module.exports = router;
