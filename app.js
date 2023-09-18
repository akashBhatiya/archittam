const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');
// const path = require('path');
const flash = require('connect-flash');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
// const bodyParser = require('body-parser');


//middle ware
app.use(express.urlencoded());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(session({
    name: 'Archittam',
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*24*10
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//templete engine
app.set('view engine', 'ejs');
app.set('views', './views');

//connected to routes
app.use('/',require('./routes/index'));

app.listen(port,(err) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is listening on ${port}`);
})

