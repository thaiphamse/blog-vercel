const port = 3000;

const express = require('express');
const path = require('path');
const app = express();
const routes = require('./src/api/v1/routes/index.js')
const hbsViewEngineConfig = require('./src/api/v1/configs/hbs.js')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const dbConnect = require('./src/api/v1/configs/mongoDB.js')



// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// hbsViewEngineConfig(app)

// dbConnect.connect()

app.use(cookieParser());

// parse application/json

app.get("/", (req, res) => {
  res.send('hi')
})
// console.log(process.env);
app.listen(port, () => {
  console.log(`Blog app is listening on port ${port}`)
})