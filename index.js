//server
const express = require("express");
const app = express();

//middleware
app.use((req, res, next) => {
  console.log("This is awesome.");
  next(); // forward the request
});

//route
app
  .get("/", (req, res) => {
    res.send("Server backend at home page.");
  })
  .get("/about", (req, res, next) => {
    return next(new Error("This is not implemented"));
  });

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! We don't know.");
});

//port
app.listen(3000, () => {
  console.log("Server Started.");
});
