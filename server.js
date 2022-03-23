/**
* import all modules
**/

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
const fetch = import('node-fetch');
const session = require('express-session');
const routeur = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

/**
* import all related Javascript and css files to inject in our app
*/

app.use ( session ( { secret : '1111111' ,saveUninitialized : false , resave : false } ) ) ;
app.use ( bodyParser.json ( ) ) ;      
app.use ( bodyParser.urlencoded ( { extended : true } ) ) ;
app.use( express.static(__dirname + '/public')); 
app.use('/favicon.ico', express.static(__dirname + '/public/images/favicon.ico')); 
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/js/dist'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/*
* parse all form data
*/

app.use(bodyParser.urlencoded({ extended: true}));
module.exports = app;

/*
*used for formatting dates
*/
 
var now = new Date();

/*
* view engine template parsing (ejs types)
*/

app.set('view engine','ejs');

/**
 * mongoDB
**/

// Connection URI
const uri = "mongodb+srv://admin:Amal1234@museedesastres.0xwj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect

const client = new MongoClient(uri);

async function run() {
	try {
	  	await client.connect();
	  	const database = client.db('musee_desastres_db');

		// Connection to clusters
		activites = database.collection("activites");
		comptes = database.collection("comptes");
		itemsboutique = database.collection("shop");
		rdvetoiles = database.collection("rdv_etoiles");
		reservations = database.collection("reservations");
		expo = database.collection('expositions');

		console.log("Connexion réussie :)");
	} finally {
	}
}

// Declaration des collections et execution de la connexion

var activites;
var comptes;
var itemsboutique;
var rdvetoiles;
var reservations;
var expo;

run().catch(console.dir);

/**
* Global site title and base url
*/

const siteTitle = "Musée des Astres";
const baseURL = "http://localhost:4000/"

/* pour le .sort des sortables */
function compare( a, b ) {
	if ( a.DateDebut < b.DateDebut ){
	  return 1;
	}
	if ( a.DateDebut > b.DateDebut ){
	  return -1;
	}
	return 0;
}




/*
* Accueil
*/
app.get('/',async function (req,res) {    
		
	// recuperer les info des tables expo et activites
	const cur1 = expo.find();

	const cur2 = activites.find();
	
	sortable = [];

	await cur1.forEach(element1 => {
		sortable.push(element1);
	});
	await cur2.forEach(element2 => {
		sortable.push(element2);
	});

	sortable.sort(compare);

	res.render('pages/index',{
		siteTitle : siteTitle,
		pageTitle : "Index",
		items : sortable
	});
	  
});


/**
 * Expo
*/

app.get('/expositions',async function (req,res) {

	const sort = { date_debut: -1 };

	const cursor = expo.find({}).sort(sort);

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

	res.render('pages/activites/expositions',{
		siteTitle : siteTitle,
		pageTitle : "Experience",
		items : result
	});

});

/**
 * Experiences
*/

app.get('/experiences',async function (req,res) {

	const sort = { date_debut: -1 };

	const cursor = activites.find({}).sort(sort);

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

	res.render('pages/activites/activites',{
		siteTitle : siteTitle,
		pageTitle : "Exp",
		items : result
	});
	
});

/**
 * Rdv_etoiles
*/

app.get('/rdv_etoiles',async function (req,res) {



    res.render('pages/divers/construction',{
    	siteTitle : siteTitle,
    	pageTitle : "rdv",
    	items : "result"
    	
	});
});

/**
 * Plan
*/

app.get('/plan',async function (req,res) {

    res.render('pages/informations/plan',{
    	siteTitle : siteTitle,
    	pageTitle : "plan",
    	items : "result"
    	
	});
});

/**
 * Info
*/

app.get('/info',async function (req,res) {

    res.render('pages/informations/coord',{
    	siteTitle : siteTitle,
    	pageTitle : "coord",
    	items : "result"
	});
});

/**
 * Reservation
*/

app.get('/billeterie',async function (req,res) {

	res.render('pages/divers/construction',{
		siteTitle : siteTitle,
		pageTitle : "billet",
		items : result
	});
});

/**
 * Boutique
*/

app.get('/boutique',async function (req,res) {

    res.render('pages/divers/construction',{
    	siteTitle : siteTitle,
    	pageTitle : "bout",
    	items : "result"
	});
});

/**
* connect to server
*/

var server = app.listen(4000, function(){
	console.log("serveur fonctionne sur 4000... ! ");
});