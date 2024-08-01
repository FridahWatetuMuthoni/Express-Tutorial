let fs = require("fs");
let fsPromises = require("fs").promises;
let { v4: uuid } = require("uuid");
let { format } = require("date-fns");
let path = require("path");

const eventLogger = async (message, logname) => {
  const date = format(new Date(), "yyyyMMdd HH:mm:ss");
  const logItem = `${date}\t${uuid()}\t${message}\n`;

  try {
    //check if the log directory exists
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    //append the message
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logname),
      logItem
    );
  } catch (error) {
    console.log(error);
    let errMsg = `${uuid()}\t${date}\t${error.name} ${error.message}\n`;
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", "errorLog.txt", errMsg)
    );
  }
};

const logger = (req, res, next) => {
  eventLogger(
    `${req.method} ${req.headers.origin} ${req.url}`,
    "accessLog.txt"
  );
  next();
};

module.exports = { eventLogger, logger };
