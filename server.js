/**
* import all modules
**/

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

/*
app.use((req, res, next) => {
	console.log('Requête reçue !');
	next(); // passer au prochain middleware
  });
  
  app.use((req, res, next) => {
	res.json({ message: 'Votre requête a bien été reçue !' });
	next();
  });
  app.use((req, res, next) => {
	console.log('Réponse envoyée avec succès !');
	next();
  });
  */
 
/*
* parse all form data
*/
   app.use(bodyParser.urlencoded({ extended: true}));

   module.exports = app;
/*
*used for formatting dates
*/
var dateFormat = require('dateformat');
var now = new Date();

/*
* view engine template parsing (ejs types)
*/

app.set('view engine','ejs');

/**
* import all related Javascript and css files to inject in our app
*/

app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/**
* connection à la BD
*/

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mybd"
});

/**
* Global site title and base url
*/

const siteTitle = "Simple application";
const baseURL = "http://localhost:4000/"

	/*
	* Envoyer le contenu au client
	* get the event list
    */
app.get('/',function (req,res) {    
	
 /*
get the event list with select from table 
*/
/*	
** verifier la connexion à la BD : Afficher les events dans la table items sur la console
con.connect(function(err) {
    if (err) throw err;
con.query("SELECT * FROM e_events ", function (err, result){
    if (err) throw err;
    console.log('lol');
    console.log(result);
});

});
*/
/*
res.render('pages/index',{
    siteTitle : siteTitle,
    pageTitle : "Event list",
    items : ''
});

/*
get the event list with select from table 
*/
	
	con.query("SELECT * FROM e_events ORDER BY e_start_date DESC", function (err, result){
		res.render('pages/index',{
			siteTitle : siteTitle,
			pageTitle : "Event list",
			items : result
		});
	});

}); /* fin de app.get(....)*/

/*
pour generer la page add event 
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
post method to data : pour ajouter un evenement à la BD
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
pour editer un event 
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
methode post a la bd : modifier un evenement
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
pour supprimer un event 
*/

app.get('/event/delete/:id',function (req,res) {
    con.query("DELETE FROM e_events WHERE e_id = '" + req.params.id + "'", function (err, result){
        if (err) throw err;
        res.redirect(baseURL);
});

});
/**
* connect to server
*/

var server = app.listen(4000, function(){
	console.log("serveur fonctionne sur 4000... ! ");
});