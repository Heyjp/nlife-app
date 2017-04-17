var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

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
    res.render('index');
  }
});

router.get('/*', function (req, res) {
  res.redirect('/');
});



// AJAX request
router.post('/search/', function (req, res) {

      let location = req.body.city;
      req.session.lastSearch = location;

      ySearch.newLocalSearch(location, function (err, data) {
        if (err) {
          console.log(err, "here is the error");
          res.send(err);
        } else {
            // DATABASE QUERY IF SUCCESSFULL
            Location.queryGuestList(location, data, function (err, query) {
                if (err) {
                  console.log(err);
                  res.send("there was an error");
                }
                  res.status(200).json(query);
              });
            }
        });
  });

  router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function (err, user) {
      if (err) {
        console.log(err, "login error");
      }
      if (!user) {
        console.log("user details is false");
      } else {
        req.session.user = user.username;
        let sig = jwt.sign({id: user.username}, "keyboard cat");
        res.status(200)
        .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
        .send('It was a success');
      }
    })(req, res, next);
  });



  // Adding and Removing attendance
  router.post('/check', function (req, res) {
    let token = jwt.verify(req.cookies.token, 'keyboard cat');

    if(token.id === req.session.user) {
      let id = req.body.id;
      let city = req.body.city;
      let user = req.session.user;

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
          res.status(200).send({status: "bad id"});
       }
  });


router.post('/logout', function (req, res) {
  console.log(req.session.user, "this is req.session.user");
  if (req.session.user) {
    delete req.session.user
    res.clearCookie('token');
    req.logout();
    res.status(200).send('logged out');
  } else {
    res.status(200).send('not loggedin')
  }
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
