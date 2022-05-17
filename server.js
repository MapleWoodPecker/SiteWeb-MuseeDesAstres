/**
* Importation de tous les modules
**/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const session = require('express-session');
const MongoClient = require("mongodb").MongoClient;
const ejs = require("ejs");
const pdf = require("html-pdf-node");
const qrcode = require('qrcode');
const fs = require('fs');
var cron = require('node-cron');
const fetch = require('node-fetch');

/**
* importation et injection de tous les fichiers de script et style
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
* form body parser
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

// URI de connexion
const uri = "mongodb+srv://admin:Amal1234@museedesastres.0xwj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// connexion

const client = new MongoClient(uri);

async function run() {
	try {
	  	await client.connect();
	  	const database = client.db('musee_desastres_db');

		// connexion aux clusters
		activites = database.collection("activites");
		comptes = database.collection("comptes");
		itemsboutique = database.collection("shop");
		rdvetoiles = database.collection("rdv_etoiles");
		reservations = database.collection("reservations");
		expo = database.collection('expositions');
		con = database.collection('compte_admin');
		tarifs = database.collection('tarifs');
		transactions = database.collection('transactions');

		console.log("Connexion réussie :)");
	} catch {
		console.log("Connexion échouée :(");
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
var transactions;

run().catch(console.dir);

/**
* Titre du site et url global
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
function compare_rdv( a, b ) {
	if ( a.datetime > b.datetime ){
	  return 1;
	}
	if ( a.datetime < b.datetime ){
	  return -1;
	}
	return 0;
}
/*
* Accueil
*/
app.get('/',async function (req,res) {    

	// recuperer les info des tables expo et activites
	
	var result = [];

	await expo.find().forEach(element1 => {
		result.push(element1);
	});
	await activites.find().forEach(element2 => {
		result.push(element2);
	});

	result.sort(compare);

	var results = [];
	var now = new Date();

	result.forEach( item => {
		if (item.date_fin >= now || item.date_debut >= now) {
			results.push(item);
		}
	});

	res.render('pages/index',{
		siteTitle : siteTitle,
		pageTitle : "Index",
		items : results
	});
	  
});


/**
 * Expositions
*/

app.get('/expositions',async function (req,res) {

	const cursor = expo.find().sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

	var results = [];
	var now = new Date();

	result.forEach( item => {
		if (item.date_fin >= now) {
			results.push(item);
		}
	});

	res.render('pages/activites/expositions',{
		siteTitle : "Expositions - Musée des Astres",
		pageTitle : "Expositions",
		items : results
	});

});

/**
 * Activités
*/

app.get('/activites',async function (req,res) {

	const cursor = activites.find({}).sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

	var results = [];
	var now = new Date();

	result.forEach( item => {
		if (item.date_debut >= now) {
			results.push(item);
		}
	});

	res.render('pages/activites/activites',{
		siteTitle : "Activités - Musée des Astres",
		pageTitle : "Activités",
		items : results
	});
	
});

/**
 * Détails des experiences 
 */

 app.get('/experience/:id', async function (req, res) {
	var id = req.params.id;

	const cursor1 = await activites.find({});
	const cursor2 = await expo.find({});

	var result;

	await cursor1.forEach(element => {
		if (element._id.toString() === id) {
			result = element;
		}
	});
	await cursor2.forEach(element => {
		if (element._id.toString() === id) {
			result = element;
		}
	});

	if (result.image.substring(0, 4) != "http") {
		result.image = base64_encode('public\\' + result.image);
	}

	if (result == undefined) {
		console.log("id inexistant");
		res.redirect("/");
		res.end();
	} else {
		res.render('pages/activites/details', {
			siteTitle: result.titre + " - Musée des Astres",
			pageTitle: "Détails",
			item: result
		});
	}
});

/**
 * Rendez-vous sous les étoiles
*/

app.get('/meteo',async function (req,res) {

	const cursor = rdvetoiles.find({}).sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});

    res.render('pages/informations/meteo',{
    	siteTitle : "Meteo - Musée des Astres",
    	pageTitle : "Meteo",
    	items : result
    	
	});
	
});

app.get('/rdv_etoiles',async function (req,res) {

	const cursor = rdvetoiles.find({}).sort({ date_debut: -1 });

	var result = [];

	await cursor.forEach(element2 => {
		result.push(element2);
	});
	result.sort(compare_rdv);

    res.render('pages/activites/rdv_etoiles',{
    	siteTitle : "Rendez-vous sous les étoiles - Musée des Astres",
    	pageTitle : "Rendez-vous sous les étoiles",
    	items : result
    	
	});
	
});

/*
* Scheduler pour RDV etoiles
*/
cron.schedule('01 * * * *', () => {
	/* Éxécuter la tache à chaque heure */
	rdvScheduler();
});

async function rdvScheduler(){
	
	console.log("***Éxécution de la tâche RDV étoile (chaque heure)***");
	
	const uri_weather = "http://api.weatherapi.com/v1/forecast.json?key=3fcb64167526422099d202413221105&q=Montreal&days=3&aqi=no&alerts=yes";
	let settings = { method: "Get" };

	//Fetch le JSON
	let data = await fetch(uri_weather, settings)
		.then(res => res.json())
		.then((json) => {
        return json;
    });
	
	//Affichage des infos
	console.log("   Le coucher de soleil dans deux jours est à " + data.forecast.forecastday[2].astro.sunset)
	var hr = parseInt(data.forecast.forecastday[2].astro.sunset.substr(0, 2));
	hr = hr+13; //calcul de l'heure de coucher de soleil +1 (tjrs arroundi a la baisse)
	//console.log("   La température 1 heure après le coucher de soleil est de " +  data.forecast.forecastday[2].hour[hr].temp_c + "°C")
	var cloud_perc = data.forecast.forecastday[2].hour[hr].cloud; //pourcentage de nuages
	//console.log("   La couverture nuageuse 1 heure après le coucher de soleil est de " +  cloud_perc + "%")*/
	
	//si ciel assez degage
	if(cloud_perc < 25){
		console.log("   Couverture nuageuse 1 heure plus tard sous 25%.")
		const cursor = await rdvetoiles.find();

		var result;

		await cursor.forEach(element => {
			var elementdate = element.datetime.toISOString().split('T')[0]
			if (elementdate === data.forecast.forecastday[2].date) {
				result = element;
			}
		});

		//si l'activite existe deja
		if(result != undefined){
			console.log("   Activité pas ajoutée (existe déjà dans BD)")
		}
		//sinon on l'ajoute
		else{
			var date_act = new Date(data.forecast.forecastday[2].date)
			date_act.setHours(hr);
			var rdv_temp = {
				datetime:date_act,
				temp:Math.round(parseInt(data.forecast.forecastday[2].hour[hr].temp_c))
			}
			rdvetoiles.insertOne(rdv_temp);

			console.log("   Nouvelle activité ajoutée le " + data.forecast.forecastday[2].date)
		}
	}
	//si pas assez degage, on laisse tomber
	else{console.log("   Couverture nuageuse 1 heure plus tard au dessus de 25%. Activité annulée")}
}

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

	result.sort(compare);
	
    res.render('pages/informations/plan',{
    	siteTitle : "Plan du Musée - Musée des Astres",
    	pageTitle : "Plan",
    	items : result
	});
});

/**
 * Info
*/

app.get('/info',async function (req,res) {

    res.render('pages/informations/coord',{
    	siteTitle : "Informations - Musée des Astres",
    	pageTitle : "Informations"
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
		ajrd : new Date().toISOString().replace(/T.+/, ''),
		semaine : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().replace(/T.+/, '')
	});
});

app.post('/billet',async function (req,res) {

	var tarif = [];
	const cursor = tarifs.find({}).sort({ _id: 1 });

	await cursor.forEach(element => {
		tarif.push(element);
	});

	billets = [];
	var err;

	req.body.billets_id.forEach(element => {
		if (parseInt(element) < 0) {
			err = "petit malin";
		} else {
			billets.push(parseInt(element));
		}
	});

	if (err) {
		console.log(err);
	} else {
		var prix = 0;
		for (let i = 0; i < billets.length; i++) {
			prix += (tarif[i].prix * 100) * billets[i];
		}
		prix = prix / 100;

		console.log(prix);

		var billet_temp = {
			nom: req.body.nom,
			prenom: req.body.prenom,
			email: req.body.email,
			adresse: req.body.adresse,
			telephone: req.body.telephone,
			datetime: new Date(req.body.datetime),
			rdv_etoile: (req.body.rdv == "true"),
			film: (req.body.film == "true"),
			prix: prix,
			billets_id: billets
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
		{   
			billet: billet_temp, qr: await generateQR(billet_temp._id.toString()),
			logo: base64_encode('public\\images\\logo_border.png'), img: base64_encode('public\\images\\sqr_obs.png')
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {

				pdf.generatePdf({ content: data }, {}).then(pdfBuffer => {
					console.log("PDF generated");

					var mailOptions = {
						from: 'museedesastres@gmail.com',
						to: billet_temp.email,
						subject: 'Vos billets DesAstres',
						text: "Vos billets DesAstres",
						attachments: [{
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
	}
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

			res.render('pages/reservations/email_billet',{
				siteTitle : "Billet "+ id +" - Musée des Astres",
				pageTitle : "Billet",
				billet : result,
				qr : await generateQR(result._id.toString()),
				logo : base64_encode('public\\images\\logo_border.png'), 
				img : base64_encode('public\\images\\sqr_obs.png')
			});
		}

	} else {
		res.redirect('/connexion');
	}
	res.end();
	
});

// Fonction pour l'encodage de la data d'un fichier en base64
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return "data:image/png;base64," + bitmap.toString('base64');
}

// Fonction de génération d'un QR code en base 64 à partir d'un texte
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

    res.render('pages/boutique/boutique',{
    	siteTitle : "Boutique en ligne - Musée des Astres",
    	pageTitle : "Boutique",
    	items : result
	});
});

app.post('/cart',async function (req,res) {
	
	let json = req.body;

	var result = [];
	for (let value of Object.values(json)) {
		//console.log(value);
		const cursor = await itemsboutique.find({});

		await cursor.forEach(element => {
			// console.log(element["_id"])
			// console.log(element["_id"] == value)

			if (element["_id"] == value) {
				result.push(element);
			}
			
		});
	}
	
	// console.log(result);
	res.set('Content-Type', 'application/json')
	//res.statusCode(200)	
	res.send (result)

});


app.get('/checkout',async function (req,res) {

	var result = [];

	res.render('pages/boutique/checkout',{
		siteTitle : "Confirmer la commande - Musée des Astres",
		pageTitle : "bout",
		items : result
	});
});

app.post('/bill',async function (req,res) {

	var result = [];

	res.render('pages/boutique/facture',{
		siteTitle : "test - Musée des Astres",
		pageTitle : "bout",
		items : result,
		logo : base64_encode('public\\images\\logo_border.png'),
		date : new Date().toISOString().replace(/T.+/, '')
	});

	let achats = req.body.achats;

	var items = [];
	for (let value of Object.values(achats)) {
		const cursor = await itemsboutique.find({});

		await cursor.forEach(element => {

			if (element["_id"] == value) {
				items.push(element);
			}
			
		});
	}

	if (items.length <= 0) {
		console.log("erreur facture");
	} else {

		var totalHT = 0;

		items.forEach(item => {
			totalHT += item.prix * 100;
		})
		
		var tps = totalHT * 0.05 * 100;
		var tvq = (totalHT * 100) * (0.0975 * 10000);
	
		var total = (totalHT * 1000) * (1.14975 * 100000);

		totalHT = totalHT/100;
		tps = parseFloat((tps / 10000).toFixed(2));
		tvq = parseFloat((tvq / 100000000).toFixed(2));
		total = parseFloat((total / 10000000000).toFixed(2));

		var payement = {
			totalHT : totalHT,
			tps : tps,
			tvq : tvq,
			total : total
		}

		var user = {
			nom: req.body.nom,
			prenom: req.body.prenom,
			email: req.body.email,
			adresse: req.body.adresse
		}

		var bill_temp = {
			user : user,
			date : new Date(),
			achats : items,
			payement : payement
		}

		transactions.insertOne(bill_temp);

		console.log(user.email);

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			secure: true,
			auth: {
				user: 'museedesastres@gmail.com',
				pass: 'Amal1234'
			}
		});

		ejs.renderFile(__dirname + "\\views\\pages\\boutique\\facture.ejs",
		{   
			logo: base64_encode('public\\images\\logo_border.png'), payement : payement, items : items, date : new Date().toISOString().replace(/T.+/, '')
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {

				pdf.generatePdf({ content: data }, {}).then(pdfBuffer => {
					console.log("PDF generated");

					var mailOptions = {
						from: 'museedesastres@gmail.com',
						to: user.email,
						subject: 'Votre facture DesAstres',
						text: "Merci "+ user.prenom +" "+ user.nom +" pour votre achat au Musée Des Astres !",
						attachments: [{
							filename: 'facture.pdf',
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
	}
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
			pageTitle : "Connexion Admin",
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
					pageTitle : "Connexion Denied",
					item : false
				});
			}			
			res.end();

		} else {
			res.render('pages/divers/connexion',{
				siteTitle : "Connexion Admin - MDA",
				pageTitle : "Connexion Denied",
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
			pageTitle : "Accès Admin",
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
				desc:req.body.desc,
				long:req.body.long
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
				desc:req.body.desc,
				long:req.body.long
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

/**
* connect to server
*/

const server = app.listen(4000, function(){
	console.log("serveur fonctionne sur localhost:4000...");
});