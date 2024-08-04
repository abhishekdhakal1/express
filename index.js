//server
const express = require("express");
const app = express();
const PORT = 3000;
const mockdata = require("./mockdata.json");
const {query} = require("express-validator");

const findUserIndex = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id, 10);
  const findUserIndex = mockdata.findIndex((user) => user.id === parsedId);
  req.findUserIndex = findUserIndex;
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.get("/", (req, res) => {
  res.send("Hello from express.");
});
app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req; // destructuring query params

  if (filter && value) {
    return res.send(mockdata.filter((user) => user.first_name.includes(value)));
  }
  return res.status(200).send(mockdata);
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockdata[mockdata.length - 1].id + 1, ...body };
  mockdata.push(newUser);
  return res.status(201).send(newUser);
});

//route params
app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  const user = mockdata.find((user) => user.id === parsedId);
  if (!user) return res.status(404).send({ msg: "bad request" });
  return res.send(user);
});

app.patch("/api/users/:id", findUserIndex, (req, res) => {
  const { body, findUserIndex } = req;

  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }

  mockdata[findUserIndex] = { ...mockdata[findUserIndex], ...body }; //spread operator
  return res.status(200).send(mockdata[findUserIndex]);
});

app.delete("/api/users/:id", findUserIndex, (req, res) => {
  const { findUserIndex } = req;
  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }
  mockdata.splice(findUserIndex);
  return res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
