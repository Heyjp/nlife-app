var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Location = require('../config/guestlist');
var ySearch = require('../config/yelp');
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  var location;
  if (req.session.lastSearch && !req.user) {
    console.log("session does exist");
    location = req.session.lastSearch;
    console.log(location);
    ySearch.newLocalSearch(location, function (err, data) {
      if (err) {
        res.redirect("/")
      } else {
          // DATABASE QUERY IF SUCCESSFULL
          Location.queryGuestList(location, data, function (err, query) {
              if (err) {
                console.log(err);
                res.send("there was an error");
              }
                // Combine MONGODB with YELP API data
                var newData = handleBusiness(query);
                res.render("index", {object: newData});
            });
          }
      });
    } else if (req.user) {
        if(req.user.location) {
          location = req.user.location;
        } else if (req.session.lastSearch){
          User.update({username: req.user.username}, {$set: {location: req.session.lastSearch} }, function (err, data) {
            if (err) {
              console.log(err);
            }
            return data;
          });
        }
        ySearch.newLocalSearch(location, function (err, data) {
          if (err) {
            res.redirect("/")
          } else {
              // DATABASE QUERY IF SUCCESSFULL
              Location.queryGuestList(location, data, function (err, query) {
                  if (err) {
                    console.log(err);
                    res.send("there was an error");
                  }
                  var newData = handleBusiness(query);
                  console.log(newData);
                    res.render("index", {object: newData});
                });
              }
          });
    } else {
    res.render('index', { name: "friend", familiarName: "pal" });
  }
});

// AJAX request
router.get('/search/', function (req, res) {

    console.log(req.query, "this is req");

      var location = req.query.query;
      req.session.lastSearch = location;

      ySearch.newLocalSearch(location, function (err, data) {
        if (err) {
          console.log(err, "here is the error");
          res.redirect("/")
        } else {
          console.log("there was no error, querying database")
            // DATABASE QUERY IF SUCCESSFULL
            Location.queryGuestList(location, data, function (err, query) {
                if (err) {
                  console.log(err);
                  res.send("there was an error");
                }
                  console.log(query, "this is query");
                  res.status(200).json(query);
              });
            }
        });
  });

  router.get('/dashboard', function (req, res) {
    if (req.user) {
      res.render('dashboard', {name: req.user.username});
    } else {
      res.render('dashboard', {name: "no balls"});
    }
  });

  router.get('/login', function (req, res) {
    res.render('login');
  });

  router.post('/login', passport.authenticate('local-login', { successRedirect: '/',
                                                    failureRedirect: '/login' }));


  router.post('/register', passport.authenticate('local-signup', { successRedirect: '/',
                                                    failureRedirect: '/register' }));

  router.get('/register', function (req, res) {
    res.render('register');
  });



  // AJAX REQUEST
  router.post('/check', function (req, res) {
    let id = req.body.bar;
    let city = req.body.city;

    console.log(req.body, "this is check req")
    
    if (req.user) {
    var user = req.user.username;

          Location.addOrRemoveUser(id, city, user, function (err, msg, result) {
              if (err) {
                console.log(err);
                res.status(500).send("there was a server error");
              }
              else {
                res.status(200).send({guestList: result});
              }
          });
     } else {
        res.status(200).send({status: "works?"});
     }

});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;


function handleBusiness (query) {

  var newArray = [];

  query.businesses.forEach(function (element) {
    var obj = {};
    obj.name = element.name;
    obj.rating = element.rating;
    obj.location = element.location.city;
    obj.text = element.snippet_text;
    obj.id = element.id;
    obj.img = element['image_url'];
    obj.att = element.guestListLength;
    newArray.push(obj);
  })
    return newArray;
}
