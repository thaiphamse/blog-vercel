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
const MongoStore = require('connect-mongo');
require("dotenv").config();



hbsViewEngineConfig(app);

dbConnect.connect();
// app.set('trust proxy', 1); // Ensure this is set before session middleware

// parse application/json
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());
app.use(cookieParser());

// Sử dụng middleware session với MongoDB store
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.znj9b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`, // URL kết nối tới MongoDB của bạn
            collectionName: 'sessions', // Tên collection trong MongoDB để lưu trữ session
        }),
        cookie: {
            maxAge: 86400000, // 1 days
            sameSite: "Lax",
            // httpOnly: true,
            // secure: false,
        },
    }),
);

// Cấu hình Passport và sử dụng session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use(logger("dev"));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
routes(app);

module.exports = app;
