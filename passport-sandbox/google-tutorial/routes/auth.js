var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../db');

var router = express.Router();

const CLIENT_URL = 'http://localhost:3000'

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
   console.log('----------issuer-------', issuer)
   console.log('----------profile-------', profile)
  //console.log('----------cb-------', cb,toString()) // this log statement causes crash for some reason, so only enable if needed
  //debugger;
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) {
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }

        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false); }
        return cb(null, row);
      });
    }
  });
}));

// see https://www.passportjs.org/tutorials/google/session/
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
//end see https://www.passportjs.org/tutorials/google/session/
///////////

//From with-react-passport-google-oidc
router.get("/login/success", (req, res) => {
  console.log('---------------login/success')
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});


////////////
router.get('/login', function(req, res, next) {
  res.render('login'); //render an ejs page - which when the login button is clicked will redirect to /login/federated/google 
});

//START - This code would be in the react application
//React would route to here, /login/federated/google
router.get('/login/federated/google', passport.authenticate('google'));

//Google then redirects to the path specified in https://console.cloud.google.com/apis/credentials/oauthclient/
// e.g. /oauth2/redirect/google
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/login'
})
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// Logging Out
//see https://www.passportjs.org/tutorials/google/logout/
// router.post('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });
//end see https://www.passportjs.org/tutorials/google/logout/

//END - This code would be in the react application


module.exports = router;