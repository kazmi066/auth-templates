import { config } from "dotenv";
import { createConnection } from "mysql";
config();

// For SQL connection
const sqlConnection = () => {
  const connection = createConnection({
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

export default sqlConnection;
