const mysql = require("mysql");
require("dotenv").config();

parameters = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
};

const mysqlConnection = mysql.createConnection(parameters);

// now invoke the .connect method
mysqlConnection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        // if successful, write a message to the console
        console.log("Connected to MySQL");
    }
});

module.exports = { mysqlConnection };