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
const { User } = require("../mongoose/schemas/user.js");
const { findUserIndex } = require("../utils/middlewares.js");

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

router.post("/api/users", async (req, res) => {
  const { body } = req;
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

router.delete("/api/users/:id", findUserIndex, (req, res) => {
  const { findUserIndex } = req;
  if (findUserIndex === -1) {
    return res.status(400).send("User not found");
  }
  mockdata.splice(findUserIndex);
  return res.status(200).send({ msg: "deleted successfully" });
});

module.exports = { router };
