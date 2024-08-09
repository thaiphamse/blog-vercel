const siteRoute = require("./site.route.js");
const postRoute = require("./post.route.js")
const apiRoute = require("./api.route.js")

const passport = require('./passport.js')
module.exports = (app) => {

  app.use("/auth", passport)
  app.use("/oauth2", passport) //google oauth2
  app.use("/redirect", passport) //google redirect
  app.use("/post", postRoute); //google redirect
  app.use("/api/v1", apiRoute);
  app.use("/", siteRoute);

  //Global handle error error
  app.use(function (err, req, res, next) {
    // render the error page
    res.render('error', {
      title: "Oops",
      message: err,
    });
  });
};
