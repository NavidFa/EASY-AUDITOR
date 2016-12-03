var express = require('express');
var router = express.Router();
var passport = require('../passport');
var flash = require('connect-flash');
var users = require("../users")
var queries = require("../db/queries")
var knex = require('../db/knex.js')
var plaid = require('plaid');

require('dotenv').config();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.post('/login', passport.authenticate('local', {
    successRedirect: 'back',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
}));
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect("/");
})
router.post('/register', function(req, res, next) {
    users.Register(req.body.firstName,req.body.lastName, req.body.username, req.body.password, req.body.password1)
        .then(function(message) {
            if (message.rowCount == 1) {
                res.status(200).send('success')

            } else {
                res.status(404).send('Something broke!')

            }
        })
})


router.get('/addAccount', function(req, res, next) {
  if (req.isAuthenticated()) {
     res.send(req.user);
    }else{
      res.redirect('/login');
    }
})


router.get('/verified', function(req, res, next) {
   res.send(req.isAuthenticated())
})

var plaidClient = new plaid.Client(process.env.PLAID_CLIENT_ID,
                                   process.env.PLAID_SECRET,
                                   plaid.environments.tartan);

router.post('/authenticate', function(req, res) {
  var public_token = req.body.public_token;


  // Exchange a public_token for a Plaid access_token
  plaidClient.exchangeToken(public_token, function(err, exchangeTokenRes) {
    if (err != null) {
      // Handle error!
    } else {
      // This is your Plaid access token - store somewhere persistent
      // The access_token can be used to make Plaid API calls to
      // retrieve accounts and transactions
      var access_token = exchangeTokenRes.access_token;


      plaidClient.getAuthUser(access_token, function(err, authRes) {
        if (err != null) {
          // Handle error!
        } else {
          // An array of accounts for this user, containing account
          // names, balances, and account and routing numbers.
          var accounts = authRes.accounts;
          // Return account data
          res.json({accounts: accounts,token:access_token});
        }
      });
    }
  });
});











module.exports = router;
