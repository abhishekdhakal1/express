//server
const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { router: routes } = require("./routes/index.js");
const { cookie } = require("express-validator");

mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

app.use(express.json());
app.use(cookieParser("secret"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.send("Hello from express.");
});
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
