//server
const express = require("express");
const app = express();
const PORT = 3000;

const { router : routes } = require("./routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello from express.");
});
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
