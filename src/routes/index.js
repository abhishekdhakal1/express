const { Router } = require("express");
const router = Router();
const { router: userRouter } = require("./users.js");
const { router: productRouter } = require("./product.js");

router.use(userRouter);
router.use(productRouter);

module.exports = { router };
