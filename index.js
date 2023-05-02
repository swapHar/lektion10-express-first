// Inport database
const dbDrive = require('better-sqlite3');
// Connect to db
const db = dbDrive('bands.sqlite3');

//Import express
const express = require('express');
// Create express app
const app = express();

// Express setup
// Serve a static frontend
app.use(express.static('frontend'));
// Tell express to use json
app.use(express.json());

// REST API routes
app.get('/bands',(req, res) => {
    //req = request
    //res = response

    //Prepare and execute in one line
    const bands = db.prepare(`SELECT * FROM bands`).all();

    // Send back json
    res.json(bands);
});

// Get single band based on url / id
app.get('/bands/:id',(req, res) =>{
    //get the URL id
    const id = req.params.id;

    let statement =db.prepare('SELECT * FROM bands WHERE id = :id');
    let result = statement.all({
        id
    });

    // Send back band or error
    res.json(result[0] || {'error': 'No band matching id'});

});

// Start the server
app.listen(3000,() => {
    console.log('Server started on port 3000.');
});