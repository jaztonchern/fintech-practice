const database = require("../database/database");
const express = require("express");

router = express.Router();

router.get("/transactions/all", (request, response) => {
    database.connection.query(`SELECT *
                               FROM transactions`, (errors, results) => {
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Server Error");
        } else {
            response.status(200).send(results);
        }
    });
});

router.get("/transactions/by-tid", (request, response) => {
    if (request.query.id.length === 0 || isNaN(request.query.id)) {
        console.log(`Invalid ID received. ID: ${request.query.id}`);
        response.status(400).send("Invalid ID received.");
        return;
    }
    database.connection.query(
        `SELECT *
         FROM transactions
         WHERE transaction_id = ${request.query.id}`,
        (errors, results) => {
            if (errors) {
                console.log(errors);
                response.status(500).send("Internal Server Error");
            } else {
                response.status(200).send(results);
            }
        }
    );
});

module.exports = {
    router,
};