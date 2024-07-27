const siteRoute = require("./site.route.js");
const passport = require('./passport.js')
module.exports = (app) => {

  app.use("/auth", passport)
  app.use("/oauth2", passport) //google oauth2
  app.use("/redirect", passport) //google redirect
  app.use("/", siteRoute);

  // app.use(function (req, res, next) {
  //   throw new Error('Something broke!');
  // });

  //handle error error
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log([err]);
    // render the error page

    res.render('error', {
      title: "Page not found",
      message: err?.message,
    });
  });
};
