const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const Rental = require('./models/rental');
const rentalRoutes = require('./routes/rentals');
var ObjectId = require('mongodb').ObjectID;

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

const app = express();

// app.use('/api/v1/rentals', rentalRoutes);

app.get('/api/v1/rentals', function(req, res){
    Rental.find({}, function(err, foundRentals){
        res.json(foundRentals);
    });
});

app.get('/api/v1/rentals/:id', function(req, res){
    const rentalId = req.param.id;

    Rental.findOne(rentalId, function(err, foundRentals){
        if(err){
            res.status.caller(422).send({errors: [{title: "Rental Errror!", detals: "Could not find Rental!"}]});
        }
        res.json(foundRentals);
    });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running');
});