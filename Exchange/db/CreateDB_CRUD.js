const SQL = require("./db");
const fs = require("fs");
const Data = require("./Data");
const bcrypt = require("bcrypt");

//create the Tabels
const createTabels = (req, res) => {
  const sqlFilePath = `${__dirname}/create-tables.sql`;
  fs.readFile(sqlFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading SQL file:", err);
      return;
    }

    const queries = data.split(";").filter((query) => query.trim() !== "");

    executeQueries(queries).then(() => {
      console.log("Tables created successfully.");
    });
  });
};
function executeQueries(queries) {
  return new Promise((resolve, reject) => {
    if (queries.length === 0) {
      resolve();
      return;
    }

    const query = queries.shift();
    SQL.query(query, (err) => {
      if (err) {
        reject(err);
        return;
      }

      executeQueries(queries).then(resolve).catch(reject);
    });
  });
}
const creatUsers = (user, callback) => {
  // Generate the bcrypt-hashed password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      callback(err);
      return;
    }

    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        callback(err);
        return;
      }

      // Modify the user object to include the hashed password
      const newUser = {
        ...user,
        password: hashedPassword,
      };
      console.log(newUser);
      // Insert the new user into the database
      SQL.query("INSERT INTO customers SET ?", newUser, (err, mysqlres) => {
        if (err) {
          console.log("Error in running query:", err);
          callback(err);
          return;
        } else {
          console.log("Created user, user id:", { id: mysqlres.insertId });
          callback(null, mysqlres.insertId);
        }
      });
    });
  });
};
const createDATA = (req, res) => {
  for (const user of Data.users) {
    creatUsers(user, (err, userId) => {
      if (err) {
        console.error("Error creating user:", err);
      } else {
        console.log("Successfully created user with id:", userId);
      }
    });
  }

  // Insert currencies into the 'currencies' table
  const currenciesQuery =
    "INSERT INTO currencies (currency_id, currency_code, currency_name, currency_symbol) VALUES ?";
  const currenciesValues = Data.currencies.map((currency) => [
    currency.currency_id,
    currency.currency_code,
    currency.currency_name,
    currency.currency_symbol,
  ]);

  SQL.query(currenciesQuery, [currenciesValues], (error, results) => {
    if (error) {
      console.error("Error inserting currencies:", error);
    } else {
      console.log("Currencies inserted successfully");
    }
  });

  // Insert transactions into the 'transactions' table
  const transactionsQuery =
    "INSERT INTO transactions (date, city, address, from_currency_id, to_currency_id, amount, status, from_user_id, to_user_id) VALUES ?";
  const transactionsValues = Data.transactions.map((transaction) => [
    transaction.date,
    transaction.city,
    transaction.address,
    transaction.from_currency_id,
    transaction.to_currency_id,
    transaction.amount,
    transaction.status,
    transaction.from_user_id,
    transaction.to_user_id,
  ]);

  SQL.query(transactionsQuery, [transactionsValues], (error, results) => {
    if (error) {
      console.error("Error inserting transactions:", error);
    } else {
      console.log("Transactions inserted successfully");
    }
  });
  res.redirect("/");
};
const DropTabels = (req, res) => {
  const query = "SHOW TABLES";

  SQL.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching table names:", err);
      res.status(500).send("Error fetching table names");
      return;
    }

    const tableNames = results.map(
      (result) => result[`Tables_in_${SQL.config.database}`]
    );
    const dropQueries = tableNames.map(
      (tableName) => `DROP TABLE IF EXISTS ${tableName}`
    );

    executeQueries(dropQueries)
      .then(() => {
        res.send("All tables dropped successfully.");
      })
      .catch((error) => {
        console.error("Error dropping tables:", error);
        res.status(500).send("dropping tables");
      });
  });
};

module.exports = {
  createDATA,
  createTabels,
  DropTabels,
};
