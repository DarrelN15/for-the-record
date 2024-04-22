require('dotenv').config();
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const flash = require('connect-flash');

const db = require('./database'); 
const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const profileRouter = require('./routes/profile');
const checkoutRouter = require('./routes/checkout');
const usersRouter = require('./routes/users');
const itemRouter = require('./routes/item');
const genreRouter = require('./routes/genre');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth'); 

const { ensureAuthenticated, checkAdmin, checkUser } = require('./middleware/authMiddleware');
const setNavigation = require('./middleware/navigation');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(setNavigation);

// Pass flash messages to all views
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Authentication middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/cart', ensureAuthenticated, cartRouter);
app.use('/profile', ensureAuthenticated, profileRouter);
app.use('/checkout', ensureAuthenticated, checkoutRouter);
app.use('/users', usersRouter);
app.use('/item', itemRouter);
app.use('/genre', genreRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/admin', ensureAuthenticated, checkAdmin, adminRouter);

// Admin routes - only accessible to admins
app.use('/admin', ensureAuthenticated, checkAdmin, adminRouter);

// Catches 404 and forwards to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.user = req.session.user || null;
  next();
  res.status(err.status || 500);
  res.render('error');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
