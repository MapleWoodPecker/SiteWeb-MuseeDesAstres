/**
* import all modules
**/

var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var nodemailer = require('nodemailer');
const fetch = require('node-fetch'); //npm install node-fetch@2
const session = require('express-session');
const routeur = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { nextTick } = require('process');
const ejs = require("ejs");
var qrcode = require('qrcode');
const { url } = require('inspector');

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
		con = database.collection('compte_admin');
		tarifs = database.collection('tarifs');

		console.log("Connexion réussie :)");
	} finally {
	}
}

// Declaration des collections et execution de la connexion

var activites;
var itemsboutique;
var rdvetoiles;
var reservations;
var expo;
var con;
var tarifs;

run().catch(console.dir);

/**
* Global site title and base url
*/

const siteTitle = "Musée des Astres";
const baseURL = "http://localhost:4000/"

/* pour le .sort des tables croisées en JS */
function compare( a, b ) {
	if ( a.date_debut > b.date_debut ){
	  return 1;
	}
	if ( a.date_debut < b.date_debut ){
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
	
	result = [];

	await cur1.forEach(element1 => {
		result.push(element1);
	});
	await cur2.forEach(element2 => {
		result.push(element2);
	});

	result.sort(compare);

	res.render('pages/index',{
		siteTitle : siteTitle,
		pageTitle : "Index",
		items : result
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

	const sort = { date_debut: -1 };

	const cursor = rdvetoiles.find({}).sort(sort);

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

    res.render('pages/activites/rdvetoiles',{
    	siteTitle : siteTitle,
    	pageTitle : "rdv",
    	items : result
    	
	});
	
});

/**
 * Plan
*/

app.get('/plan',async function (req,res) {

	var result = [];

    res.render('pages/informations/plan',{
    	siteTitle : siteTitle,
    	pageTitle : "plan",
    	items : result
    	
	});
});

/**
 * Info
*/

app.get('/info',async function (req,res) {

	var result = [];

    res.render('pages/informations/coord',{
    	siteTitle : siteTitle,
    	pageTitle : "coord",
    	items : result
	});
});

/**
 * Reservation
*/

app.get('/billeterie',async function (req,res) {

	const sort = { _id: 1 };

	const cursor = tarifs.find({}).sort(sort);

	var results = [];

	await cursor.forEach(element => {
		results.push(element);
	});

	var ajrd = dateFormat(now, 'yyyy-mm-dd');
	var date = (new Date().getDate()+7).toString();
	var moisAnnee = dateFormat(now, 'yyyy-mm');
	var semaine = moisAnnee + "-" + date;

	res.render('pages/reservations/billeterie',{
		siteTitle : siteTitle,
		pageTitle : "billeterie",
		items : results,
		ajrd : ajrd,
		semaine : semaine
	});
});

app.post('/billet',async function (req,res) {

	billets = [];

	req.body.billets_id.forEach(element => {
		billets.push(parseInt(element));
	});

	var billet_temp = {
		nom:req.body.nom,
		prenom:req.body.prenom,
		email:req.body.email,
		adresse:req.body.adresse,
		telephone:req.body.telephone,
		datetime:new Date(req.body.datetime),
		rdv_etoile:(req.body.rdv == "true"),
		film:(req.body.film == "true"),
		billets_id:billets
	}

	reservations.insertOne(billet_temp);

	console.log(billet_temp.email);

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: true,
		auth: {
		  user: 'museedesastres@gmail.com',
		  pass: 'Amal1234'
		}
	});

	ejs.renderFile(__dirname + "\\views\\pages\\reservations\\email_billet.ejs", { billet : billet_temp },async function (err, data) {
		if (err) {
			console.log(err);
		} else {
			var mailOptions = {
				from: 'museedesastres@gmail.com',
				to: req.body.email,
				subject: 'Vos billets DesAstres',
				html: data
			};

			transporter.sendMail(mailOptions, function (err, info) {
				if (err) {
					res.end('error');
				} else {
					console.log('Message sent: ' + info.response);
					res.get("/billet");
				}

			});

		}
		
	});
	
});

app.get('/billet',async function (req,res) {
	res.redirect('/connexion');
	res.end();
});

app.get('/billet/:id',async function (req,res) {

	// If the user is loggedin
	if (req.session.loggedin) {

		var id = req.params.id;
		console.log("requete pour le billet : " + id);

		const cursor = await reservations.find({});

		var billet_temp;
	
		await cursor.forEach(element => {
			if	(element._id.toString() === id) {
				billet_temp = element; 
			}
		});

		if (billet_temp == undefined){
			console.log("id inexistant");
			res.redirect('/admin');
			res.end();
		} else {

			var url = await generateQR(billet_temp._id.toString());

			var result = {
				nom:billet_temp.nom,
				prenom:billet_temp.prenom,
				email:billet_temp.email,
				adresse:billet_temp.adresse,
				telephone:billet_temp.telephone,
				datetime:billet_temp.datetime,
				rdv_etoile:billet_temp.rdv_etoile,
				film:billet_temp.film,
				billets_id:billet_temp.billets_id,
				qr : url
			};

			res.render('pages/reservations/email_billet',{
				siteTitle : siteTitle,
				pageTitle : "billet",
				billet : result
			});
		}

	} else {
		res.redirect('/connexion');
	}
	res.end();
	
});

const generateQR = async text => {
	try {
	  return await qrcode.toDataURL(text);
	} catch (err) {
	  console.error(err)
	}
}

/**
 * Boutique
*/

app.get('/boutique',async function (req,res) {

	const sort = { titre: 1 };

	const cursor = itemsboutique.find({}).sort(sort);

	var result = [];

	await cursor.forEach(element => {
		result.push(element);
	});


    res.render('pages/boutique',{
    	siteTitle : siteTitle,
    	pageTitle : "bout",
    	items : result
	});
});

app.get('/checkout',async function (req,res) {

	var result = [];

    res.render('pages/checkout',{
    	siteTitle : siteTitle,
    	pageTitle : "bout",
    	items : result
	});
});

/**
 * Connexion
*/
var session_admin;

app.get('/connexion',async function (req,res) {

	session_admin = req.session;

	var result = [];

	if (session_admin.username){
		return res.redirect ( '/admin' );
	} else {
		res.render('pages/divers/connexion',{
			siteTitle : siteTitle,
			pageTitle : "con",
			item : true
		});
	}

});

app.post('/connexion', async function (req,res){

	// Capture the input fields
	let user = req.body.username;
	let pass = req.body.password;

	// Ensure the input fields exists and are not empty
	if (user && pass) {

		const cursor = await con.findOne({username: user});
		
		if (cursor != null) {

			// If the account exists
			if (cursor.password == pass) {
				// Authenticate
				req.session.loggedin = true;
				req.session.username = user;
				// Redirect 
				res.redirect('/admin');
			} else {
				res.render('pages/divers/connexion',{
					siteTitle : siteTitle,
					pageTitle : "no",
					item : false
				});
			}			
			res.end();

		} else {
			res.render('pages/divers/connexion',{
				siteTitle : siteTitle,
				pageTitle : "no2",
				item : false
			});
		}

	} else {
		res.send('Erreur critique login');
		res.end();
	}

});

/**
 * Admin
*/

app.get('/admin',async function (req,res) {

	// If the user is loggedin
	if (req.session.loggedin) {
		
		const cursor = reservations.find({});

		var result = [];

		await cursor.forEach(element => {
			result.push(element);
		});

		res.render('pages/divers/admin',{
			siteTitle : siteTitle,
			pageTitle : "bout",
			items : result
		});

	} else {
		res.redirect('/connexion');
	}
	res.end();

});

app.post('/admin',async function (req,res) {
	if (req.body.type == "activites") {
		activites.insertOne(
			{
				titre:req.body.titre,
				date_debut:new Date(req.body.date_debut),
				duree:parseInt(req.body.duree),
				salle:req.body.salle,
				image:req.body.image,
				particip_max:parseInt(req.body.particip_max),
				desc:req.body.desc
			}
		);
	} else if (req.body.type == "expositions") {
		activites.insertOne(
			{
				titre:req.body.titre,
				date_debut:new Date(req.body.date_debut),
				date_fin:new Date(req.body.date_fin),
				duree:parseInt(req.body.duree),
				salle:req.body.salle,
				image:req.body.image,
				particip_max:parseInt(req.body.particip_max),
				desc:req.body.desc
			}
		);
	} else if (req.body.type == "shop") {
		itemsboutique.insertOne(
			{
				titre:req.body.titre,
				prix:parseInt(req.body.prix),
				quantite:parseInt(req.body.quantite),
				magasin:(req.body.magasin === "on"),
				image:req.body.image,
				desc:req.body.desc,
				tags:req.body.tags
			}
		);
	}
	
    res.end('done');
});

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if (err) {
           console.log(err);
        }
        res.redirect ('/');
    });
});

// ajax inter pages?

/**
* connect to server
*/

var server = app.listen(4000, function(){
	console.log("serveur fonctionne sur 4000...");
});