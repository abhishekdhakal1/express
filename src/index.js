//server
const express = require("express");
const app = express();
const PORT = 3000;

const { router } = require("./routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
