const express = require('express');
const mongoose = require('mongoose').set('debug', true);
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const Rental = require('./models/rental');


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
    const rentalId = req.params.id;

    Rental.findOne({"_id" : rentalId}, function(err, foundRentals){
        if(err){
            res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
        }
        res.json(foundRentals);
    });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running');
});