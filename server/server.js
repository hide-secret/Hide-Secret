const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

app.use(cookieParser());
app.use(cors());

//import routers
const passportRouter = require("./routes/passportRouter");
const secretRouter = require("./routes/secretRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
const { PORT } = process.env;

//Parsing the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//routers
app.use("/auth/google", passportRouter);
app.use("/user", userRouter);
app.use("/secrets", secretRouter);

// bad route error handling
app.use((req, res) => {
  console.log("we are in a bad route");
  res.sendStatus(418);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// checks if cluster is the master cpu core
if (cluster.isMaster) {
  // spawn workers up to amount of cpu cores.
  for (let i = 0; i < numCPUs; i++) {
    // spawns a new worker
    cluster.fork();
  }
  // catch if worker had died
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    // create a new worker
    cluster.fork();
  });
} else {
  app.listen(3000, () =>
    console.log(`Server ${process.pid} running at port 3000`)
  );
}
