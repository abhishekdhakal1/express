const { Router } = require("express");
const router = Router();

router.get("/api/product", (req, res) => {
  res.status(201).send([{ id: 1, product: "unknown" }]);
});

module.exports = { router };
