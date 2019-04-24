const Contact = require('../models/contact');
const Rental = require('../models/rental');
const User = require('../models/user');
const { normaliZeErrors } = require('../helpers/mongoose');

exports.createContact = function(req, res){

    const { name, email, rental } = req.body;
    const user = res.locals.user;
    
    const contact = new Contact({name, email});

    Rental.findById(rental._id)
           .populate('user')
           .populate('contacts')
           .exec(function(err, foundRental){
            if(err){
                return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
            }

            if(foundRental.user.id === user.id){
                return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
            }

            //user who is making the booking
            contact.user = user._id;
            contact.rental = foundRental._id;
            foundRental.contacts.push(contact);

            contact.save(function(err){
                if(err){
                    return res.status(422).send({errors: normaliZeErrors(err.errors)});
                }

                foundRental.save();

                User.update({_id: user.id}, {$push: {contacts: contact}}, function(){});

                return res.json({"status":"successful!"});
            });

           });

           
}