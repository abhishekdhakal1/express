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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("This is awesome.");
  next(); // forward the request
});

//route
app.get("/api/about", (req, res) => {
  const {
    query: { filter, value },
  } = req; // destructuring query params

  if(filter && value){
    return res.send(mockdata.filter((user)=> user.first_name.includes(value)));
  } 
  return res.status(200).send(mockdata);
});

//route params
app.get("/api/about/:id", (req, res) => {
  //console.log(req.params);
  const parsedId = parseInt(req.params.id);
  //console.log(parsedId);
  console.log(req.query);
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
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
