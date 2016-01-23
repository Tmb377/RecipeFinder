var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
require('../db');
var User = mongoose.model('User');
var Grocery = mongoose.model('Grocery');


//authenticate login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/home', 
	failureRedirect: '/login', 
	failureFlash: true })
);

/* GET login (home) page. */
router.get('/', function(req, res, next) {
  
  if(typeof req.user != 'undefined'){
  	res.render('index', {username:req.user.username});
  }
  else{
  	res.render('login', { message: req.session.messages } );
  }
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/home', 
	failureRedirect: '/',
	failureFlash: true
}));

//log out user
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


// GET signup page
router.get('/register', function(req, res, next){
	res.render('signup');
});

// POST new account info
router.post('/register', function(req, res) {
	User.register(new User({username : req.body.username}), req.body.password, function(err, user){
	if(err){
		return res.render('register');
	}
	passport.authenticate('local')(req, res, function(){
		//redirect back to home (login) page for login
		res.redirect('/');
	});
});
});
//get user homepage
router.get('/home', function(req, res){
	if(typeof req.user == 'undefined'){
		res.redirect('/');
	}
	res.render('index', {username:req.user.username});
});

//get search page
router.get('/search', function(req, res){
	if(typeof req.user == "undefined"){
		res.redirect('/');
	}
	else{
		res.render('search');
	}
});

//get recipe page from search results
router.get('/search/:recipeid', function(req, res){
	res.render('recipepage', {name: req.params.recipeid});

});

//add ingredients from recipe to grocery list
router.post('/search/:recipeid', function(req, res){
	if(typeof req.body.ingCheck == "string"){
		it = [req.body.ingCheck];
		User.findOneAndUpdate({_id:req.user["_id"]}, {$push: {groceryList: {name: req.body.recipeName, ingredients: it}}}, function(err, gr, count){
			res.redirect('back');
		});

	}
	else{
		
		User.findOneAndUpdate({_id:req.user["_id"]}, {$push: {"groceryList": {name: req.body.recipeName, ingredients: req.body.ingCheck}}}, function(err, gr, count){
			res.redirect('back');
		});
	}

});

//get grocery list
router.get('/list', function(req, res){
	if(typeof req.user == "undefined"){
		res.redirect('/');
	}
	User.findOne({_id:req.user["_id"]}, function(err, us, count){
		res.render('grocery', {recipe:us.groceryList});
	});
});

//remove items from grocery list
router.post('/list', function(req, res){
	if(typeof req.body.listCheck == 'string'){
		User.findOneAndUpdate({_id:req.user["_id"]}, {$pull: {"groceryList": {name: req.body.listCheck}}}, function(err, gr, count){
			res.redirect('back');
		});
	
	}
	else{
		req.body.listCheck.forEach(function(el, index, array){
			User.findOneAndUpdate({_id:req.user["_id"]}, {$pull: {"groceryList": {name: el}}}, function(err, gr, count){
			});
		});
		res.redirect('back');
	}
	
	
});

//add recipe to favorites
router.post('/fav/add', function(req, res){
	User.findOneAndUpdate({_id:req.user["_id"]}, {$push: {"favorites": {name: req.body.recipeName, url: req.body.recipeID}}}, function(err, gr, count){
			res.redirect('back');
		});
});

//get recipes from favorites list
router.get('/favorites', function(req, res){
	if(typeof req.user == 'undefined'){
		res.redirect('/');
	}
	User.findOne({_id:req.user["_id"]}, function(err, us, count){
			res.render('favorites', {favorite:us.favorites});
	});
});
//get favorite recipe
router.get('/fav/:recipeid', function(req, res){
	res.render('recipepage', {name: req.params.recipeid});
});


module.exports = router;
