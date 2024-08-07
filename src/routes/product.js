const { Router } = require("express");
const router = Router();

router.get("/api/product", (req, res) => {
  if (req.signedCookies.hello && req.signedCookies.hello === "world")
    return res.status(201).send([{ id: 1, product: "chicken" }]);
  return res.send({ msg: "Sorry but this is not available due to cookies" });
});

module.exports = { router };
