const dotenv = require("dotenv");
const sql = require("mysql");
dotenv.config();

const sqlConnection = () => {
  const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });

  connection.connect(function (err, res) {
    if (err) throw err;
    else {
      console.log("Database connected", res);
      return res;
    }
  });

  return connection;
};

module.exports = sqlConnection;
