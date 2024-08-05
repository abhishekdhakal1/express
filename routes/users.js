const { Router } = require("express");
const { query, validationResult } = require("express-validator");
const  mockdata  = require("../mockdata.json");
const router = Router();

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

module.exports = { router };
