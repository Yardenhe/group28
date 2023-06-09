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
    t.from_user_id,\
    cu1.phone_number,\
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
  SELECT t.*, c1.currency_code AS from_currency_code, c2.currency_code AS to_currency_code, CONCAT(cu1.name, ' ', cu1.last_name) AS full_name, cu1.phone_number
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
            res.cookie("userID", results[0]["id"]);
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
// add Transaction
const addTransaction = (req, res) => {
  const transactionData = {
    amount: req.body.amount,
    from_currency_id: req.body.fromCurrency,
    to_currency_id: req.body.toCurrency,
    city: req.body.city,
    address: req.body.Address,
    date: new Date(),
    status: "Pending",
    to_user_id: null,
    from_user_id: req.cookies.userID || null,
  };
  console.log(transactionData);

  const sql = "INSERT INTO transactions SET ?";
  SQL.query(sql, transactionData, (err, result) => {
    if (err) {
      console.log("Error inserting transaction:", err);
    } else {
      console.log("Transaction inserted successfully");
      // Redirect the user to the OffersPage
      res.redirect("/OffersPage");
    }
  });
};
//myhistorytransections
const GetMyHistoryTransactions = (req, res) => {
  let userID = req.cookies.userID; // Accessing the userID from the req object
  const sql = `
  SELECT t.*, c1.currency_code AS from_currency_code, c2.currency_code AS to_currency_code
  FROM transactions t
  JOIN currencies c1 ON t.from_currency_id = c1.currency_id
  JOIN currencies c2 ON t.to_currency_id = c2.currency_id
  WHERE t.from_user_id = ${userID} or t.to_user_id = ${userID}
`;
  SQL.query(sql, (err, transactions) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      // Render the transactions template with the retrieved transactions data
      res.render("MyHistoryPage", { transactions });
    }
  });
};
//get detail by userid
const GetUserById = (req, res) => {
  let userID = req.cookies.userID; // Accessing the userID from the req object
  const page = req.path.substring(1); // Extracting the page name from the URL path
  const sql = `SELECT * FROM customers WHERE id = ${userID}`;

  SQL.query(sql, (err, users) => {
    if (err) {
      // Handle the error appropriately
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      const user = users[0];
      res.render(page, { user });
    }
  });
};
const EditUser = (req, res) => {
  // Validate that body is not empty
  if (!req.body) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }

  // Retrieve data from the request body
  const updatedUser = {
    email: req.body.email,
    name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    birthdate: req.body.birth_date,
    username: req.body.username,
    password: req.body.password, // Assuming the password is provided as plain text
  };

  // Generate the salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).send("An error occurred");
    }

    bcrypt.hash(updatedUser.password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("An error occurred");
      }

      // Set the hashed password in the updated user object
      updatedUser.password = hashedPassword;

      // Update the user in the database
      const sql = `UPDATE customers SET ? WHERE id = ${req.cookies.userID}`;
      SQL.query(sql, updatedUser, (err, result) => {
        if (err) {
          console.log("Error updating user:", err);
          res.status(500).send("An error occurred");
        } else {
          console.log("User updated successfully");
          // Redirect or render a success page
          res.redirect("/MyProfilePage");
        }
      });
    });
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
  addTransaction,
  GetMyHistoryTransactions,
  GetUserById,
  EditUser,
};
