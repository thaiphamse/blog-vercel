const app = require('./app.js')
const port = process.env.PORT || 3000;
// console.log(process.env);
app.listen(port, () => {
    console.log(`Blog app is listening on port ${port}`)
  })