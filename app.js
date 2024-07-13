const express = require("express");
const path = require("path");
const app = express();
const routes = require("./src/routes/index.js");
const hbsViewEngineConfig = require("./src/configs/hbs.js");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const dbConnect = require("./src/configs/mongoDB.js");
const passport = require("passport");
const { log } = require("console");
require("dotenv").config();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

hbsViewEngineConfig(app);

dbConnect.connect();

app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
console.log(": ", process.env.NODE_ENV);

// Sử dụng middleware session
app.use(
session({
    secret: "Xtera123!",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 36000,
      sameSite: "Lax",
      // secure: false,
      // httpOnly: true,
      // path: '/',
      // expires: new Date(new Date().getTime() + 86409000)
    },
    // 1 ngày (đơn vị tính bằng mili giây)
  }),
);

// Cấu hình Passport và sử dụng session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use(logger("dev"));

routes(app);

module.exports = app;
