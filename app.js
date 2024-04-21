require('dotenv').config();
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const db = require('./database.js'); // Includes SQLite database configuration
const flash = require('connect-flash');

// Imports route handlers
const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const profileRouter = require('./routes/profile');
const checkoutRouter = require('./routes/checkout');
const usersRouter = require('./routes/users');
const itemRouter = require('./routes/item');
const genreRouter = require('./routes/genre');
const productsRouter = require('./routes/products');
const artistRouter = require('./routes/artist');
const decadeRouter = require('./routes/decade');
const albumRoutes = require('./routes/albums');

const setNavigation = require('./middleware/navigation');

const app = express();

// Sets up view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middleware
app.use(setNavigation);
app.use(express.static(path.join(__dirname, 'public'))); // Static file serving
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET, // Uses environment variable for the secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Uses secure cookies in production
}));

// Sets up static file serving
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

// Passes messages to all views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Defines routes
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/profile', profileRouter);
app.use('/checkout', checkoutRouter);
app.use('/users', usersRouter);
app.use('/item', itemRouter);
app.use('/genre', genreRouter);
app.use('/artist', artistRouter);
app.use('/decade', decadeRouter);
app.use('/album', albumRoutes);
app.use('/products', productsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Sets locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renders the error page
  res.status(err.status || 500);
  res.render('error');
});

// Sets the port and listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
