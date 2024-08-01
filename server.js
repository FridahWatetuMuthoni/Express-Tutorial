let express = require("express");
let path = require("path");
let cors = require("cors");
let { logger } = require("./middlewares/eventLogger");
let { errorHandler } = require("./middlewares/errorHandler");

let app = express();
let PORT = process.env.PORT || 3500;

//custom middleware
//logger
app.use(logger);

//builtin middleware
//form data = content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//json data
app.use(express.json());

//third party middleware
const whitelist = ["http://localhost:3500", "http://127.0.0.1:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    //remove !origin during production=> only use it in developement
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//app routing

//router
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employee"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//custom error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `The server is running, open your browser at http://localhost:${PORT}`
  );
});
