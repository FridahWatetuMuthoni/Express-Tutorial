const { eventLogger } = require("../middlewares/eventLogger");

const errorHandler = (err, req, res, next) => {
  let message = `${err.name} : ${err.message}`;
  eventLogger(message, "errorLog.txt");
  res.status(500).send(message);
  next();
};

module.exports = { errorHandler };
