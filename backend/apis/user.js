// File will contain all the APIs related to the User handling

const express = require("express");

const database = require("../mock_data");

const router = express.Router();

// Define routes

// Get the data of all users
router.get("/get-all", (request, response) => {
    const users = database.get_all_users();
    response.send(users);
});

// Get the data of a particular user by specifying user id
router.get("/get-user-by-id", (request, response) => {
    const id = request.query.id;
    const user = database.get_user_by_user_id(id);
    response.send(user);
});

// Add a new user
router.post("/add-user", (request, response) => {

    // Define constants to store input info
    const { first_name, last_name, email, phone } = request.body;

    // Error messages for corresponding input if missing info
    if (!first_name) {
        response.status(400).send("First name is required");
        return;
    }
    if (!last_name) {
        response.status(400).send("Last name is required");
        return;
    }
    if (!email) {
        response.status(400).send("Email address is required");
        return;
    }
    if (!phone) {
        response.status(400).send("Phone number is required");
        return;
    }

    // Add user info to database using stored info
    database.add_user({
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone,
    });

    response.send("User added successfully!");

});


module.exports = { router };