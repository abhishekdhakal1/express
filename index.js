//server
const express = require("express");
const app = express();
const PORT = 3000;

const mockdata = [
  {
    id: 1,
    first_name: "Mariquilla",
    last_name: "Hartzenberg",
  },
  {
    id: 2,
    first_name: "Jesse",
    last_name: "Munkley",
  },
  {
    id: 3,
    first_name: "Fae",
    last_name: "Gilchriest",
  },
  {
    id: 4,
    first_name: "Market",
    last_name: "Morling",
  },
  {
    id: 5,
    first_name: "Kzerallaa",
    last_name: "Leong",
  },
  {
    id: 6,
    first_name: "Hjerketa",
    last_name: "Koling",
  },
];

//middleware
// const loggingMiddleware = (req, res, next) =>{
//  console.log(`${req.method}-${req.url}`)
//  next();
// };

const findUserIndex = (req, res, next) =>{
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id, 10);
  const findUserIndex = mockdata.findIndex((user) => user.id === parsedId);
  req.findUserIndex = findUserIndex;
  next();
}

//app.use(loggingMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("This is middleware.");
  next(); // forward the request
});

//route
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
  //console.log(req.params);
  const parsedId = parseInt(req.params.id);
  //console.log(parsedId);
  //console.log(req.query);
  const user = mockdata.find((user) => user.id === parsedId);
  if (!user) return res.status(404).send({ msg: "bad request" });
  return res.send(user);
});

//error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke! We don't know");
// });

app.patch("/api/users/:id",findUserIndex, (req, res) => {
  const {
    body,
    findUserIndex,
  } = req;

  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }

  mockdata[findUserIndex] = { ...mockdata[findUserIndex], ...body }; //spread operator
  return res.status(200).send(mockdata[findUserIndex]);
});

app.delete("/api/users/:id",findUserIndex, (req, res) => {
  const {
    findUserIndex
  } = req;
  //const parsedId = parseInt(id);
  //const findUserIndex = mockdata.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }
  mockdata.splice(findUserIndex);
  return res.status(200);
});

//port
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
