var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
<<<<<<< HEAD
=======
var jwt = require('jsonwebtoken');
>>>>>>> new-branch

var Location = require('../config/guestlist');
var ySearch = require('../config/yelp');
var User = require('../models/users');
<<<<<<< HEAD

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

      var searchTerm = req.query;
      var location = Object.keys(searchTerm)[0].toLowerCase();
=======
var Utils = require('../utils/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/*', function (req, res) {
  res.redirect('/');
});

// AJAX request
router.post('/search/', function (req, res) {
      console.log(req.body, "this is search, req body")
      let location = req.body.city;
>>>>>>> new-branch
      req.session.lastSearch = location;

      ySearch.newLocalSearch(location, function (err, data) {
        if (err) {
<<<<<<< HEAD
          res.redirect("/")
=======
          console.log(err, "here is the error");
          res.status(200).send(err);
>>>>>>> new-branch
        } else {
            // DATABASE QUERY IF SUCCESSFULL
            Location.queryGuestList(location, data, function (err, query) {
                if (err) {
                  console.log(err);
<<<<<<< HEAD
                  res.send("there was an error");
=======
                  res.status(200).send("there was an error");
>>>>>>> new-branch
                }
                  res.status(200).json(query);
              });
            }
        });
  });

<<<<<<< HEAD
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
    if (req.user) {
    var user = req.user.username;
    var id = req.body.barId;
    var city = req.body.city;
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
=======
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
        .send(user.username);
      }
    })(req, res, next);
  });

  router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function (err, user) {
      if (err) {
        console.log(err, "signup error");
      }
      if (!user) {
        console.log("user already exists is false");
      } else {
        console.log("successful signup", user)
        req.session.user = user.username;

        let sig = jwt.sign({id: user.username}, "keyboard cat");
        res.status(200)
        .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
        .send(user.username);
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

router.post('/user', function (req, res) {

  if (!req.cookies.token) {
    console.log("no cookie")
    return res.status(200).send({user: false});
  }

  if (req.cookies.token) {
    console.log("we have cookie")
    let token = jwt.verify(req.cookies.token, 'keyboard cat');
    if (token.id === req.session.user) {
      return res.status(200).send({user: req.session.user});
    } else {
      return res.status(200).send({user: false});
    }
  }
});


router.post('/query', function (req, res) {

  console.log("req.session.lastSearch", req.session.lastSearch)

    if (req.session.lastSearch && req.session.user) {
      return res.status(200).send({location: req.session.lastSearch})
    } else {
      return res.status(200).send({location: ''})
    }

});

module.exports = router;
>>>>>>> new-branch
