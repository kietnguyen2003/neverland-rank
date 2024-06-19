const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
// Create an instance of the Handlebars engine with the helper
const hbs = exphbs.create({
    extname: 'hbs',
    helpers: {
        addOne: function(value) {
            return value + 1;
        },
        sum: function(a, b, c) {
            return a + b + c;
        }
    }
});

// Engine template
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'http://127.0.0.1:5500');
    next();
});


module.exports = app;