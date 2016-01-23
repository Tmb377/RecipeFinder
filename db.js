var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');



//favorites
//users may select recipes that they like to store as their favorites
var Favorites = new mongoose.Schema({
	//Yummly API does not allow us to store thier data offsite, so to store 
	// favorites, I'll be saving the URL used to get the recipe from the
	// Yummly API
	url:String,
	name:String
});

//grocery
//users may add recipe ingredients to their grocery list
var Grocery = new mongoose.Schema({
	//name of recipe
	name:String,
	//all of the ingredients for the recipe 
	ingredients:[String]
});

//user
// *Users have a username and password
// *They also have a userId, which is used to connect them with their
// favoires and their grocery list
var User = new mongoose.Schema({
	//each user has one list for all of their groceries 
	groceryList: [Grocery], 
	favorites: [Favorites]
});


User.plugin(passportLocalMongoose);


mongoose.model('User', User);
mongoose.model('Favorites', Favorites);
mongoose.model('Grocery', Grocery);


mongoose.connect('mongodb://localhost/recipefinderdb');