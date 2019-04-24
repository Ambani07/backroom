const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: { type: String, required: 'Name is required'},
    email: { type: String, required: 'Email is required'},
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    rental: { type: Schema.Types.ObjectId, ref: 'Rental'},
}, {collection: "Contact"});

module.exports = mongoose.model('Contact', contactSchema);