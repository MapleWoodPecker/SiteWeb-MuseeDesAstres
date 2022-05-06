/**
* import all modules
**/

const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch'); //npm install node-fetch@2
const session = require('express-session');
const routeur = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { nextTick } = require('process');
const ejs = require("ejs");
const pdf = require("html-pdf-node");
const qrcode = require('qrcode');
const { url } = require('inspector');
const { pbkdf2 } = require('crypto');
const { json } = require('body-parser');

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
	} catch {
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


// client.connect((error , db) => {
// 	if (error){
// 		throw error;
// 	}
// 	const database = client.db('musee_desastres_db');
// 	//Search query for deletion
// 	var query = { nom : "1234" };
	
// 	//Accessing the collection
// 	database.collection("reservations").deleteMany(query , (err , collection) => {
// 		if(err) throw err;
// 		console.log(collection.result.n + " Record(s) deleted successfully");
// 		console.log(collection);
// 		db.close();
// 	});
// });

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
	
	result = [];

	await expo.find().forEach(element1 => {
		result.push(element1);
	});
	await activites.find().forEach(element2 => {
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

	const cursor = expo.find({}).sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

	res.render('pages/activites/expositions',{
		siteTitle : "Expositions - Musée des Astres",
		pageTitle : "Expositions",
		items : result
	});

});

/**
 * Experiences
*/

app.get('/activites',async function (req,res) {

	const cursor = activites.find({}).sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

	res.render('pages/activites/activites',{
		siteTitle : "Activités - Musée des Astres",
		pageTitle : "Exp",
		items : result
	});
	
});

/**
 * Rdv_etoiles
*/

app.get('/rdv_etoiles',async function (req,res) {

	const cursor = rdvetoiles.find({}).sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

    res.render('pages/activites/rdvetoiles',{
    	siteTitle : "Rendez-vous sous les étoiles - Musée des Astres",
    	pageTitle : "rdv",
    	items : result
    	
	});
	
});

/**
 * Plan
*/

app.get('/plan',async function (req,res) {

	result = [];

	await expo.find().forEach(element1 => {
		result.push(element1);
	});
	await activites.find().forEach(element2 => {
		result.push(element2);
	});

    res.render('pages/informations/plan',{
    	siteTitle : "Plan du Musée - Musée des Astres",
    	pageTitle : "plan",
    	items : result
	});
});

/**
 * Info
*/

app.get('/info',async function (req,res) {

    res.render('pages/informations/coord',{
    	siteTitle : "Informations - Musée des Astres",
    	pageTitle : "info"
	});
});

/**
 * Reservation
*/

app.get('/billeterie',async function (req,res) {

	const cursor = tarifs.find({}).sort({ _id: 1 });

	var results = [];

	await cursor.forEach(element => {
		results.push(element);
	});

	res.render('pages/reservations/billeterie',{
		siteTitle : "Billeterie - Musée des Astres",
		pageTitle : "billeterie",
		items : results,
		ajrd : dateFormat(new Date(), 'yyyy-mm-dd'),
		semaine : dateFormat(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-mm-dd')
	});
});

app.get('/reservation',async function (req,res) {

	var reserv = {nom : req.body.nom, prenom : req.body.prenom , email : req.body.email, adresse : req.body.adresse, telephone : req.body.telephone,datetime : req.body.datetime,rdv_etoile : req.body.rdv_etoile, film : req.body.film, billets_id : req.body.billets_id}

	const cursor = reservations.find(reserv);

	var results = [];

	await cursor.forEach(element => {
		results.push(element);
	});

	res.render('pages/reservations/billeterie',{
		siteTitle : "Billeterie - Musée des Astres",
		pageTitle : "billeterie",
		items : results,
		ajrd : dateFormat(new Date(), 'yyyy-mm-dd'),
		semaine : dateFormat(new Date(), 'yyyy-mm') + "-" + (new Date().getDate()+7).toString()
	});
});

app.post('/billet',async function (req,res) {

	tarif = [];
	const cursor = tarifs.find({}).sort({ _id: 1 });

	await cursor.forEach(element => {
		tarif.push(element);
	});

	billets = [];
	var err;

	req.body.billets_id.forEach(element => {
		if (parseInt(element) < 0) {
			err = "Erreur petit malin";
		} else {
			billets.push(parseInt(element));
		}
	});

	var prix = 0;
	for (let i = 0; i < billets.length; i++){
		prix += tarif[i].prix * billets[i];
	}
	console.log(prix);

	var billet_temp = {
		nom:req.body.nom,
		prenom:req.body.prenom,
		email:req.body.email,
		adresse:req.body.adresse,
		telephone:req.body.telephone,
		datetime:new Date(req.body.datetime),
		rdv_etoile:(req.body.rdv == "true"),
		film:(req.body.film == "true"),
		prix:prix,
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

	ejs.renderFile(__dirname + "\\views\\pages\\reservations\\email_billet.ejs",
	{ billet : billet_temp, qr : await generateQR(billet_temp._id.toString()) },
	function (err, data) {
		if (err) {
			console.log(err);
	  	} else {
			pdf.generatePdf({ content: data }, { }).then(pdfBuffer => {
				console.log("PDF generated");
	  
				var mailOptions = {
				  from: 'museedesastres@gmail.com',
				  to: req.body.email,
				  subject: 'Vos billets DesAstres',
				  text: "Vos billets DesAstres",
				  attachments:[{
					  filename: 'billet.pdf',
					  content: pdfBuffer,
					  contentType: 'application/pdf'
				    }]
			    };
		  
			  	transporter.sendMail(mailOptions, function (err, info) {
				  	if (err) {
					  	res.end('error');
				  	} else {
					  	console.log('Message sent: ' + info.response);
					}
			  	});
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

		var result;
	
		await cursor.forEach(element => {
			if	(element._id.toString() === id) {
				result = element; 
			}
		});

		if (result == undefined){
			console.log("id inexistant");
			res.redirect('/admin');
			res.end();
		} else {

			var url = await generateQR(result._id.toString());

			res.render('pages/reservations/email_billet',{
				siteTitle : "Votre Billet - Musée des Astres",
				pageTitle : "billet",
				billet : result,
				qr : url
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

	const cursor = itemsboutique.find({}).sort({ titre: 1 });

	var result = [];

	await cursor.forEach(element => {
		result.push(element);
	});

    res.render('pages/boutique',{
    	siteTitle : "Boutique en ligne - Musée des Astres",
    	pageTitle : "bout",
    	items : result
	});
});

app.post('/cart',async function (req,res) {
	
	let json = req.body;

	console.log(json);
	var result = [];
	for (let value of Object.values(json)) {
		//console.log(value);
		const cursor = await itemsboutique.find({});

		await cursor.forEach(element => {
			console.log(element["_id"])
			console.log(element["_id"] == value)

			if (element["_id"] == value) {
				result.push(element);
			}
			
		});
	}
	
	console.log(result);
res.set('Content-Type', 'application/json')
//res.statusCode(200)	
res.send (result)

});


app.get('/checkout',async function (req,res) {

	var result = [];



	res.render('pages/checkout',{
		siteTitle : "Accès Admin - MDA",
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

	if (session_admin.username){
		return res.redirect ( '/admin' );
	} else {
		res.render('pages/divers/connexion',{
			siteTitle : "Connexion Admin - MDA",
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
					siteTitle : "Connexion Admin - MDA",
					pageTitle : "no",
					item : false
				});
			}			
			res.end();

		} else {
			res.render('pages/divers/connexion',{
				siteTitle : "Connexion Admin - MDA",
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
		
		const cursor = reservations.find({}).sort({ datetime: 1 });

		var result = [];

		await cursor.forEach(element => {
			result.push(element);
		});

		res.render('pages/divers/admin',{
			siteTitle : "Accès Admin - MDA",
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
		console.log(await activites.insertOne(
			{
				titre:req.body.titre,
				date_debut:new Date(req.body.date_debut),
				duree:parseInt(req.body.duree),
				salle:req.body.salle,
				image:req.body.image,
				particip_max:parseInt(req.body.particip_max),
				desc:req.body.desc
			}
		));
	} else if (req.body.type == "expositions") {
		console.log(await expo.insertOne(
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
		));
	} else if (req.body.type == "shop") {
		console.log(await itemsboutique.insertOne(
			{
				titre:req.body.titre,
				prix:parseInt(req.body.prix),
				quantite:parseInt(req.body.quantite),
				magasin:(req.body.magasin === "on"),
				image:req.body.image,
				desc:req.body.desc,
				tags:req.body.tags
			}
		));
	}
	console.log("Document inséré");
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

const server = app.listen(4000, function(){
	console.log("serveur fonctionne sur 4000...");
});