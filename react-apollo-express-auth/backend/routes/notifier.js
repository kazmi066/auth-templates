const express = require("express");
const sqlConnection = require("../db/connection/sql");
const router = express.Router();

router.get("/", async (req, res) => {
  const connection = sqlConnection();
  const sqlQuery = "select * from emails";
  connection.query(sqlQuery, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send("Emails Found: ", data);
  });
  connection.end();
});

router.get("/init", (req, res) => {
  const connection = sqlConnection();
  const sqlQuery =
    "CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))";

  connection.query(sqlQuery, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send("Table created ", data);
  });
  connection.end();
});

router.post("/subscribe", (req, res) => {
  const connection = sqlConnection();

  const subscriber = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };

  const sqlQuery = "INSERT INTO emails SET ?";

  database.query(sqlQuery, subscriber, (err, row) => {
    if (err) throw err;

    res.send("Subscribed successfully!", row);
  });

  connection.end();
});

module.exports = router;
