const express = require("express");
const database = require("../database/database");

const router = express.Router();

// Middleware for handling errors
function handleError(error, response) {
    console.error(error);
    response.status(500).send("Internal Server Error");
}

// Route to get all accounts
router.get("/get-all", (request, response) => {
    database.mysqlConnection.query("SELECT * FROM accounts", (error, results) => {
        if (error) {
            handleError(error, response);
        } else {
            response.status(200).send(results);
        }
    });
});

module.exports = { router };