const app = require('./app.js')
const port = 3000;
require('dotenv').config()

// console.log(process.env);
app.listen(port, () => {
  console.log(`Blog app is listening on port ${port}`)
})