const { Router } = require("express");
const {
  query,
  validationResult,
  checkSchema,
  matchedData,
} = require("express-validator");
const mockdata = require("../../mockdata.json");
const { createUserValidationSchema } = require("../utils/validationSchema.js");
const router = Router();
const { findUserIndex } = require("../utils/middlewares.js");

router.get("/", (req, res) => {
  res.send("Hello from express.");
});

router.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  const user = mockdata.find((user) => user.id === parsedId);
  if (!user) return res.status(404).send({ msg: "bad request" });
  return res.send(user);
});

router.patch("/api/users/:id", findUserIndex, (req, res) => {
  const { body, findUserIndex } = req;
  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }
  mockdata[findUserIndex] = { ...mockdata[findUserIndex], ...body }; //spread operator
  return res.status(200).send(mockdata[findUserIndex]);
});

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("It cannot be empty")
    .isLength({ min: 3, max: 5 })
    .withMessage("Mininum length must be 3 and max must be 5"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req; // destructuring query params

    if (filter && value) {
      return res.send(
        mockdata.filter((user) => user.first_name.includes(value))
      );
    }
    return res.status(200).send(mockdata);
  }
);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      //isEmpty returns true or false
      return res.status(400).send({ errors: result.array() }); // array returns error message
    const data = matchedData(req);
    // console.log(data);
    const newUser = { id: mockdata[mockdata.length - 1].id + 1, ...data };
    mockdata.push(newUser);
    return res.status(201).send(newUser);
  }
);

router.delete("/api/users/:id", findUserIndex, (req, res) => {
  const { findUserIndex } = req;
  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }
  mockdata.splice(findUserIndex);
  return res.status(200).send({ msg: "deleted successfully" });
});

module.exports = { router };