//server
const express = require("express");
const app = express();
const PORT = 3000;
const { router } = require("./routes/users.js");

app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
