//server
const express = require("express");
const app = express();

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
    first_name: "Marketa",
    last_name: "Morling",
  },
];

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("This is awesome.");
  next(); // forward the request
});

//route
app.get("/api/about", (req, res) => {
  res.status(200).send(mockdata);
});

app.get("/api/about/:id", (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  //console.log(parsedId);
  const user = mockdata.find((user) => user.id === parsedId);
  if (!user) return res.status(404).send({ msg: "bad request" });
  return res.send(user);
});

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! We don't know");
});

//port
app.listen(3000, () => {
  console.log("Server Started.");
});
