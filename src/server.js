'use strict';

const express = require('express'),
cors = require('cors'),
app = express(),
port = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.options('*', cors());
app.use(cors());

// Enable CORS and disable caching.
app.use((req, res, next) => {
    // CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Authorization, Content-Type, Accept, x-version'
    );
    res.header('Access-Control-Allow_Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Cache disable
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    next();
});
    const routes = require('../src/routes/mailRoutes.js');
    routes(app);
app.get('/', (req,res) => {
    res.send('Welcome to ticket backend');
})
app.listen(port, ()=>{
    console.log(`Node challenge port is running on ${port}`);
});
