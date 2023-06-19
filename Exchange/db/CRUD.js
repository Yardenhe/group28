const SQL = require("./db");
const path = require("path");
const bcrypt = require("bcrypt");
const Data = require("./Data");

const createNewUser = (req, res) => {
  //vakudate that body is not empty
  if (!req.body) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }
  let Salt;
  let HashedPassword;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).send("An error occurred");
    }

    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("An error occurred");
      }

      //retrive data from into json
      const NewUser = {
        email: req.body.email,
        name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        birthdate: req.body.birth_date,
        username: req.body.username,
        password: hashedPassword,
      };
      //res.cookie("user_name", req.body.username);
      SQL.query("INSERT INTO customers SET ?", NewUser, (err, mysqlres) => {
        if (err) {
          console.log("error in running query: ", err);
          res.status(400).send({
            message: "sign up failed,please contact customers serviece",
          });
          return;
        } else {
          console.log("created user, user id:", { id: mysqlres.insertId });
          res.render("LoginPage");
          return;
        }
      });
    });
  });
};

const GetAllCustomers = (req, res) => {
  SQL.query("SELECT * FROM customers", (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res
        .status(400)
        .send({ message: "error in getting all customers: " + err });
      return;
    }
    console.log("got all customers...");
    res.send(mysqlres);
    return;
  });
};
// Get all transactions
const getAllTransactions = (callback) => {
  const query =
    " SELECT\
    t.date,\
    t.city,\
    t.address,\
    c1.currency_code AS from_currency_code,\
    c2.currency_code AS to_currency_code,\
    CONCAT(cu1.name, ' ', cu1.last_name) AS full_name,\
    t.amount\
  FROM\
    transactions t\
    JOIN currencies c1 ON t.from_currency_id = c1.currency_id\
    JOIN currencies c2 ON t.to_currency_id = c2.currency_id\
    JOIN customers cu1 ON t.from_user_id = cu1.id\
  WHERE\
    t.status = 'Pending'\
  ";
  SQL.query(query, (err, result) => {
    if (err) {
      console.log("Error retrieving transactions:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// Get all currencies
const getAllcurrencies = (callback) => {
  const query =
    " SELECT currency_id, CONCAT(currency_code, ' - ', currency_name) AS currency_display\
    FROM currencies\
  ";
  SQL.query(query, (err, result) => {
    if (err) {
      console.log("Error retrieving currencies:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// Get all cities
const getAllcities = (callback) => {
  const query = " SELECT DISTINCT city FROM transactions";
  SQL.query(query, (err, result) => {
    if (err) {
      console.log("Error retrieving cities:", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
//serch
const SearchTransactions = (req, res) => {
  const fromCurrency = req.body.fromCurrency;
  const toCurrency = req.body.toCurrency;
  const city = req.body.city;
  const amount = req.body.amount;
  console.log("From Currency:", fromCurrency);
  console.log("To Currency:", toCurrency);
  console.log("City:", city);
  console.log("Amount:", amount);

  let sql = `
  SELECT t.*, c1.currency_code AS from_currency_code, c2.currency_code AS to_currency_code, CONCAT(cu1.name, ' ', cu1.last_name) AS full_name
  FROM transactions t
  JOIN currencies c1 ON t.from_currency_id = c1.currency_id
  JOIN currencies c2 ON t.to_currency_id = c2.currency_id
  JOIN customers cu1 ON t.from_user_id = cu1.id
  WHERE t.status = 'Pending'
`;

  if (fromCurrency) {
    sql += ` AND t.from_currency_id = ${fromCurrency}`;
  }

  if (toCurrency) {
    sql += ` AND t.to_currency_id = ${toCurrency}`;
  }

  if (city) {
    sql += ` AND t.city = '${city}'`;
  }

  if (amount) {
    sql += ` AND t.amount <= ${amount}`;
  }

  SQL.query(sql, (err, transactions) => {
    if (err) {
      console.log("Error retrieving transactions:", err);
      res.status(400).send({ message: "Error retrieving transactions" });
    } else {
      getAllcurrencies((err, currencies) => {
        if (err) {
          console.log("Error retrieving currencies:", err);
          res.status(400).send({ message: "Error retrieving currencies" });
        } else {
          getAllcities((err, citiesrows) => {
            if (err) {
              console.log("Error retrieving cities:", err);
              res.status(400).send({ message: "Error retrieving cities" });
            } else {
              let cities = citiesrows.map((row) => row.city);
              res.render("OffersPage", { transactions, currencies, cities });
            }
          });
        }
      });
    }
  });
};
//sign in user
const UserSignIn = (req, res) => {
  // validate body exists
  if (!req.body) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }
  // insert input data from body into json
  const NewUserSignIn = {
    username: req.body.username,
    password: req.body.password,
  };

  //run qury
  const Q1 = "SELECT * FROM customers WHERE username =?";
  SQL.query(Q1, [NewUserSignIn.username], (err, results, fields) => {
    if (err) {
      console.log("error: error: ", err);
      res.status(400).send({ message: "could not sign up" });
      return;
    } else if (results.length === 0) {
      res.render("LoginPage", { error: "Invalid username or password" });
    }
    if (results.length > 0) {
      console.log(results[0]["password"]);
      const hashedPassword = results[0]["password"];

      //   Compare the provided password with the hashed password using bcrypt
      bcrypt.compare(
        NewUserSignIn.password,
        hashedPassword,
        (bcryptErr, isMatch) => {
          if (bcryptErr) {
            console.error("Error comparing passwords:", bcryptErr);
            res.redirect("/LoginPage");
            return;
          }

          if (isMatch) {
            // Successful login
            res.cookie("username", req.body.username);
            res.redirect("/");
          } else {
            res.render("LoginPage", { error: "Invalid username or password" });
            res.render("LoginPage");
          }
        }
      );
    }
  });
};

module.exports = {
  createNewUser,
  GetAllCustomers,
  UserSignIn,
  getAllTransactions,
  getAllcurrencies,
  getAllcities,
  SearchTransactions,
};
