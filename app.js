const express = require("express");
const path = require("path");
const app = express();
const routes = require("./src/routes/index.js");
const hbsViewEngineConfig = require("./src/configs/hbs.js");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./src/configs/mongoDB.js");
require("dotenv").config();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

hbsViewEngineConfig(app);

dbConnect.connect();

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    credentials: true,
    "Access-Control-Allow-Origin": "*",
  }),
);
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
console.log("app.js: ", process.env.NODE_ENV);
// Sử dụng middleware session
app.use(
  session({
    secret: "Xtera123!",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
      sameSite: "Lax",
      // secure: false,
      // httpOnly: true,
      // path: '/',
      // expires: new Date(new Date().getTime() + 86409000)
    },
    // 1 ngày (đơn vị tính bằng mili giây)
  }),
);

app.use(logger("dev"));
routes(app);

module.exports = app;
