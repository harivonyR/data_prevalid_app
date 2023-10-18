const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// public directory set for EJS template
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configure express-session
app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));



// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

/********************
    GET request
*/

app.get('/', (req, res) => {
  res.render('login');
});

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  // Clear the authenticated session
  req.session.authenticated = false;
  res.redirect('/login');
});


/****************
    POST request
*/

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // hardcoded username and password
  if (username === 'user' && password === 'password'){
    req.session.authenticated = true;
    res.redirect('/table');
  } else {
    res.send('Login failed. Please try again.');
  }
});

// Table route
app.get('/table', isAuthenticated, (req, res) => {
  
  let cds_data = [{
    "Date" : "07/07/2023",
    "Site" : "100 - BEHENJY",
    "Region" : "Antananarivo",
    "Carburant" : "GO",
    "Statut" : "Validée",
    "Origine" : "DMS",
    "Livraison_BL" :"1000",
    "Stock_d_ouverture" : "1230",
    "Stock_theorique_final" : "354646",
    "Stock_reel_final": "54654",
    "Difference"	: "43",
    "Volume_de_ventes"	: "125",
    "Tests_de_pompe" : 	"0",
    "Ecarts_vs_vente_pour_1000": "12",
    "Cumul_vente": "4000",
    "Cumul_ecarts":"24",
    "Cumul_ecarts_vente":"411000"
  }];
  res.render('prevalidation',{cds_data:cds_data});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});