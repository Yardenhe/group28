//import modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 3000;
const SQL = require("./db/db");
const CRUD = require("./db/CRUD");
const DB_Crud = require("./db/CreateDB_CRUD");
const cookieParser = require("cookie-parser");

//cookiese
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());

//pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//connect the statics
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "images")));

// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.username = req.cookies.username || null;
  res.locals.error = null; // Initialize error as null
  next();
});
//--------------------------------------views routes----------------
//route homepage
app.get("/", (req, res) => {
  res.render("HomePage");
});
//route AboutPage
app.get("/AboutPage", (req, res) => {
  res.render("AboutPage");
});
//route OffersPage
app.get("/OffersPage", (req, res) => {
  CRUD.getAllTransactions((err, transactions) => {
    if (err) {
      console.log("Error retrieving transactions:", err);
      res.status(400).send({ message: "Error retrieving transactions" });
    } else {
      CRUD.getAllcurrencies((err, currencies) => {
        if (err) {
          console.log("Error retrieving currencies:", err);
          res.status(400).send({ message: "Error retrieving currencies" });
        } else {
          CRUD.getAllcities((err, citiesrows) => {
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
});
//route CalculatorPage
app.get("/CalculatorPage", (req, res) => {
  res.render("CalculatorPage");
});
//route MyHistoryPage
app.get("/MyHistoryPage", CRUD.GetMyHistoryTransactions); // Pass the req object to the function
//route MyProfilePage
app.get("/MyProfilePage", CRUD.GetUserById);
//route RegisterPage
app.get("/RegisterPage", (req, res) => {
  res.render("RegisterPage");
});
//route EditProfilePage
app.get("/EditProfilePage", CRUD.GetUserById);
app.get("/LoginPage", (req, res) => {
  res.render("LoginPage");
});
//--------------------------------------functions routes----------------
//new user
app.post("/signUp", CRUD.createNewUser);

//Edit user
app.post("/EditUser", CRUD.EditUser);

//route for getting all customers
app.get("/customers", CRUD.GetAllCustomers);

//sign up
app.post("/SignIn", CRUD.UserSignIn);

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("userID");
  res.redirect("/");
});
//serch route
app.post("/search", CRUD.SearchTransactions);

//Add post
app.post("/Addpost", CRUD.addTransaction);
//--------------------------------------database routes----------------
//Generate DB
//create tabels
app.get("/CreatTables", DB_Crud.createTabels);
//create Data
app.get("/CreatData", DB_Crud.createDATA);
//drop all tabels
app.get("/dropalltables", DB_Crud.DropTabels);

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
