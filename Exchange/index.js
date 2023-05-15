//import modules
const express = require("express");
const app = express();
const path = require("path");
const port = 2080;

app.use(express.static(path.join(__dirname, "static")));

//route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/Homepage/HomePage.html"));
});

//
app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
