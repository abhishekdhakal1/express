const mockdata = require("../../mockdata.json");
const findUserIndex = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id, 10);
  const findUserIndex = mockdata.findIndex((user) => user.id === parsedId);
  req.findUserIndex = findUserIndex;
  next();
};

module.exports = { findUserIndex };
