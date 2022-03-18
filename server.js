/**
* import all modules
**/

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
//const { MongoClient } = require("mongodb");
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
* connection à la BD
* !!!!!OBSOLETE!!!!!
*/

var conMulti = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb",
	multipleStatements: true
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb",
});

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
	  	const database = client.db('desastres');

		// Connection to clusters
		activites = database.collection("Activités");
		comptes = database.collection("Compte");
		itemsboutique = database.collection("Items");
		rdvetoiles = database.collection("RDV_sous_etoiles");
		reservations = database.collection("Reservations");
		expo = database.collection('expositions');

		// Text sur la table expo
	  	const query = { Titre: 'La course spatiale' };
	  	const test = await expo.findOne(query);
	  	// console.log(test);
		console.log("Connexion réussie :)");
	} finally {
	  	// Ensures that the client will close when you finish/error (obligé ??)
	  	//await client.close();
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
app.get('/',function (req,res) {    
	var query = 'SELECT * FROM `activites`; SELECT * FROM `expositions`';  
	conMulti.query(query, function (err, results, fields){

		sortable = [];

		if (results != undefined && results.length > 0){
		results[0].forEach(element1 => {
			sortable.push(element1);
		});
		results[1].forEach(element2 => {
			sortable.push(element2);
		});

		sortable.sort(compare);
		}

		res.render('pages/index',{
			siteTitle : siteTitle,
			pageTitle : "Index",
			items : sortable
		});
	  
	});
	  console.log("accueil");
}); 

/**
 * Expo
*/

app.get('/expositions',async function (req,res) {

	const sort = { DateDebut: -1 };

	const cursor = expo.find({}).sort(sort);

	var expositions = [{Titre : "pouet"}];

	await cursor.forEach(exp => {
		var temp = {
			idExpositions : exp._id,
			Titre : exp.Titre,
			DateDebut : exp.DateDebut,
			DateFin : exp.DateFin,
			Description : exp.Description,
			Locasation : exp.Locasation,
			Image : exp.Image
		};
		expositions.push(temp);
		console.log(expositions);
	});
	
	console.log(expositions + "??");

	res.render('pages/activites',{
		siteTitle : siteTitle,
		pageTitle : "Experience",
		items : expositions
	});

});

/**
 * Experiences
*/

app.get('/experiences',function (req,res) {

    con.query("SELECT * FROM activites ORDER BY DateDebut DESC", function (err, result){
		res.render('pages/activites',{
			siteTitle : siteTitle,
			pageTitle : "Expe",
			items : result
		});
	});
});

/**
 * Rdv_etoiles
*/

app.get('/rdv_etoiles',function (req,res) {



    res.render('pages/construction',{
    	siteTitle : siteTitle,
    	pageTitle : "rdv",
    	items : "result"
    	
	});
});

/**
 * Plan
*/

app.get('/plan',function (req,res) {

    res.render('pages/plan',{
    	siteTitle : siteTitle,
    	pageTitle : "plan",
    	items : "result"
    	
	});
});

/**
 * Info
*/

app.get('/info',function (req,res) {

    res.render('pages/coord',{
    	siteTitle : siteTitle,
    	pageTitle : "coord",
    	items : "result"
    	
	});
});

/**
 * Reservation
*/

app.get('/billeterie',function (req,res) {

    con.query("SELECT * FROM tarifs", function (err, result){
		res.render('pages/construction',{
			siteTitle : siteTitle,
			pageTitle : "billet",
			items : result
		});
	});
});

/**
 * Boutique
*/

app.get('/boutique',function (req,res) {

    res.render('pages/construction',{
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