'use strict';

const express = require('express');
// const path = require('path');
const ejs = require('ejs');
const bp = require('body-parser');
const session = require('express-session');

const app = express();

app.set('views', './views')
app.set ('view engine', 'ejs');

app.use(bp.urlencoded({extended: false}));
app.use(session({
    cookie: {
        'domain': 'localhost',
        'maxAge': 1440000, 
        'sameSite': true
    },
    'secret': 'keyboard cat',
    'resave': true,
    'saveUninitialized': false,
}))

const PORT = 8000;

app.post('/', (req,res, next)=> {
    console.log('post method called')
    console.log(req.body)
    if(!req.session.data){
        req.session.data = {};
    };
    if (req.body.key && req.body.value){
        req.session.data[req.body.key] = req.body.value;
    }
    next()
});

app.use('/', (req, res) => {
    console.log('get method called')
    console.log('The session: ', req.session)
    res.render('index', {
        post:{
            data: {
                key: req.body.key || null,
                value: req.body.value || null
            }
        },
        session: {
            id: req.session.id,
            data: req.session.data
        }
    });
});


app.listen(PORT, ()=> {
    console.log('the system is down on port', PORT)
});
