//import modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 2080;

//connect the statics
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "images")));

// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/Homepage/HomePage.html"));
});
//route
app.get("/AboutPage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/About/AboutPage.html"));
});

//route
app.get("/OffersPage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/Offers/OffersPage.html"));
});
//route
app.get("/CalculatorPage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/Calculator/CalculatorPage.html"));
});
//route
app.get("/MyHistoryPage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/MyHistory/MyHistoryPage.html"));
});
//route
app.get("/MyProfilePage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/MyProfile/MyProfilePage.html"));
});
//route
app.get("/RegisterPage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/Register/RegisterPage.html"));
});
app.get("/LoginPage", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/Login/LoginPage.html"));
});
//
app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
