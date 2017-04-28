var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../user');
var thisuser = null;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      thisuser = user;
      
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


router.get('/', checksession,(req, res)=>{  
	   res.render('home', {indata: JSON.stringify(thisuser), loggedin: (thisuser != null), uname:thisuser });	      	
});

function checksession(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
	   res.render('home', {indata: JSON.stringify(thisuser), loggedin: (thisuser != null), uname:thisuser });	      	
	}

}

router.get('/login', (req, res)=>{
   res.render('login');	      	
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login'}),
  function(req, res) {
  res.redirect('/');
});

router.get('/register', (req, res)=>{
   res.render('register');	      	
});

router.get('/logout', function(req, res){
  thisuser = null;	
  req.logout();
  res.redirect('/');
});

router.post('/savepat', (req, res)=>{
    if(thisuser){
    	thisuser.pat = req.body.pat;
    	thisuser.save((err)=>{
    		if(err){
    			console.log('patsave error');
    		}else{
    			console.log('pattern saved');
    		}
    	})
    }	      	
});

router.post('/register', (req, res)=>{

var retryerror = false;
var matcherror = false;

	if(!req.body.username || !req.body.password){
		retryerror = true;
	}
	if(!retryerror && req.body.password != req.body.confirmpassword){
		matcherror = true;
	}

if(retryerror){
	res.render('register', {retryerror: 'true'});
}
else if(matcherror){
	res.render('register', {matcherror: 'true'});
}else{

		var user = new User({
			username: req.body.username,
			password: req.body.password,
			pat: {bpm: 90, set: 'tr808', len:16}
		});

		user.save((err, data)=>{
			if(err){
				console.log('save error:', err);
				res.render('register', {emailerror: 'true'});
			}else{
				console.log('saved:', data);
				thisuser = user;
				res.redirect('/');
			}
		});


	
}

});

module.exports = router;
