const express = require('express');
const passport = require('passport');

const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');
const bodyParser = require("body-parser");

const app = express()
const cors = require('cors');

const cert = fs.readFileSync('./certs/openidp-feide-no.pem', 'utf8');

app.use(cors({
  origin: 'http://localhost:5005'
}));




var env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

console.log("Using configuration :", config);

require("./config/passport")(passport, config);

var app = express();

passport.use(new SamlStrategy(
  {
    path: '/login/callback',
    entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'passport-saml',
    cert: cert,
  },
  function(profile, done) {
    findByEmail(profile.email, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  })
);

app.post(
    "/login/callback",
    bodyParser.urlencoded({ extended: false }),
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
    function (req, res) {
      res.redirect("/");
    }
  );    

const port = process.env.PORT || 5005
app.listen(port)