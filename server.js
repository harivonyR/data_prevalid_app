const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

// Login route
app.get('/login', (req, res) => {
  res.send('Please enter your credentials:');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // hardcoded username and password
  if (username === 'user' && password === 'password') {
    req.session.authenticated = true;
    res.redirect('/table');
  } else {
    res.send('Login failed. Please try again.');
  }
});

// Table route
app.get('/table', isAuthenticated, (req, res) => {
  res.send('Welcome to the table.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});