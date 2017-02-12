const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// reg directory for all hbs partials
hbs.registerPartials(__dirname + '/views/partials');
// Call HBS config
app.set('view engine', 'hbs');

// express has "built in" middleware, which allows strong configuration

// App.use is how to register middleware. takes a function
// Next is called when middleware is done (we call it, with "next();"
// req and res detailed here: http://expressjs.com/en/4x/api.html

app.use( (req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	// node version 7 requires a tweak callback function
	fs.appendFile('server.log', log + '\n');
	
	next();
});

//~ app.use( (req, res, next) => {
	//~ res.render('maintenance.hbs');
//~ });
// Without a call to next(), all the code below this function never gets executed.

//This fn is now below, so users cannot access the public directory when in Maintenance mode
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// Set up a handler for an http request. needs url, fn to run (needs request and response attributes)
//~ app.get('/', (req, res) => {
	//~ //res.send('<h1>Hello Express!</h1>');
	//~ res.send({
		//~ name: 'Jeremy',
		//~ likes: [ 'cookies', 'time alone' ]
	//~ });
	
//~ });
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to whatever'
	});
	
});


// Redo main root. use home.hbs as template.

app.get('/about', (req, res) => {
	//res.send('About page');
	// render call to view engine (handlebars)
	res.render('about.hbs', {
		pageTitle: 'About Page' 
		
		});
});

// make route at /bad. send back json with an errorMessage property

app.get('/bad', (req, res) => {
	res.send({ 
		errorMessage: 'You done goofed' 
	});
});


app.listen(3000, () => {
	console.log('Server is up on port 3000');
	});
