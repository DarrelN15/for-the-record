const express = require('express');
const path = require('path');
const createError = require('http-errors');

// Import route handlers
const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const profileRouter = require('./routes/profile');
const checkoutRouter = require('./routes/checkout');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();

// Set up view engine - if you are using one like EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/profile', profileRouter);
app.use('/checkout', checkoutRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the port and listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
