/**
* import all modules
**/

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

 
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
* import all related Javascript and css files to inject in our app
*/

app.use( express.static(__dirname + '/public')); 
app.use('/favicon.ico', express.static(__dirname + '/public/images/favicon.ico')); 
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/js/dist'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/**
* connection à la BD
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
* Global site title and base url
*/

const siteTitle = "Musée des Astres";
const baseURL = "http://localhost:4000/"

/*
* Envoyer le contenu au client
* get the event list
*/
app.get('/',function (req,res) {    
	var sql = 'SELECT * FROM `activites`; SELECT * FROM `expositions`';  
	conMulti.query(sql, function (err, results, fields){
	  if(!err){
		sortable = [];

		results[0].forEach(element1 => {
			sortable.push(element1);
		});
		results[1].forEach(element2 => {
			sortable.push(element2);
		});

		sortable.sort(compare);

		res.render('pages/index',{
			siteTitle : siteTitle,
			pageTitle : "Event list",
			items : sortable
		});
	  }

	  else{
		console.log('error on query. yes that one.');
		console.log(err);
	  }
	});
	  
  }); 

/* fin de app.get(....)*/

/* pour le .sort de l'index */
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
* pour generer la page add event 
*/

app.get('/event/add',function (req,res) {
    con.query("SELECT * FROM e_events ORDER BY e_start_date DESC", function (err, result){
    	res.render('pages/add-event.ejs',{
        	siteTitle : siteTitle,
        	pageTitle : "Add new Event",
        	items : result
    	});
	});
});


/*
* post method to data : pour ajouter un evenement à la BD
*/

app.post('/event/add',function (req,res) {
	
	/* get the record base on ID
	*/
	var query = "INSERT INTO e_events (e_name, e_start_date, e_start_end,e_desc,e_location) VALUES (";
		query += " '"+req.body.e_name+"',";
		query += " '"+dateFormat(req.body.e_start_date,"yyyy-mm-dd")+"',";
		query += " '"+dateFormat(req.body.e_start_end,"yyyy-mm-dd")+"',";
		query += " '"+req.body.e_desc+"',";
		query += " '"+req.body.e_location+"')";
		
	con.query(query, function (err, result){
		if (err) throw err;
		res.redirect(baseURL);
	});
});	

/*
* pour editer un event 
*/

app.get('/event/edit/:id',function (req,res) {
    con.query("SELECT * FROM e_events WHERE e_id = '" + req.params.id + "'", function (err, result){
    
    result[0].e_start_date = dateFormat(result[0].e_start_date,"yyyy-mm-dd");
    result[0].e_start_end = dateFormat(result[0].e_end_date,"yyyy-mm-dd");
    
        res.render('pages/edit-event.ejs',{
        	siteTitle : siteTitle,
        	pageTitle : "Editing Event : "+ result[0].e_name,
        	items : result
    	});
	});
});

/*
* methode post a la bd : modifier un evenement
*/

app.post('/event/edit/:id',function (req,res) {

	/* get the record base on ID
	*/
	var query = "UPDATE  `e_events` SET";
        query += " `e_name` = '"+req.body.e_name+"',";
        query += " `e_start_date` = '"+req.body.e_start_date+"',";
        query += " `e_start_end` = '"+req.body.e_end_date+"',";
        query += " `e_desc` = '"+req.body.e_desc+"',";
        query += " `e_location` = '"+req.body.e_location+"'";
		query += " WHERE `e_events`.`e_id` = "+req.body.e_id+"";
		
	con.query(query, function (err, result){
        if (err) throw err;
		res.redirect(baseURL);
	});
});	


/*
* pour supprimer un event 
*/

app.get('/event/delete/:id',function (req,res) {
    con.query("DELETE FROM e_events WHERE e_id = '" + req.params.id + "'", function (err, result){
        if (err) throw err;
        res.redirect(baseURL);
	});
});


/**
 * ExpoTemp
*/

app.get('/expositions',function (req,res) {

	con.query("SELECT * FROM expositions ORDER BY DateDebut DESC", function (err, result){
		res.render('pages/expositions',{
			siteTitle : siteTitle,
			pageTitle : "Event list",
			items : result
		});
	});
});

/**
 * Experiences
*/

app.get('/experiences',function (req,res) {

    con.query("SELECT * FROM activites ORDER BY Date DESC", function (err, result){
		res.render('pages/activites',{
			siteTitle : siteTitle,
			pageTitle : "Event list",
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
    	pageTitle : "Editing Event : ",
    	items : "result"
    	
	});
});

/**
 * Plan
*/

app.get('/plan',function (req,res) {

    res.render('pages/plan',{
    	siteTitle : siteTitle,
    	pageTitle : "Editing Event : ",
    	items : "result"
    	
	});
});

/**
 * Info
*/

app.get('/info',function (req,res) {

    res.render('pages/coord',{
    	siteTitle : siteTitle,
    	pageTitle : "Editing Event : ",
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
			pageTitle : "Event list",
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
    	pageTitle : "Editing Event : ",
    	items : "result"
	});
});

/**
* connect to server
*/

var server = app.listen(4000, function(){
	console.log("serveur fonctionne sur 4000... ! ");
});