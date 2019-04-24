const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: { type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    street: { type: String, required: true, lowercase: true },
    suburb: { type: String, required: true, lowercase: true },
    city: { type: String, required: true, lowercase: true },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    bedrooms: Number,
    shared: Boolean,
    description: { type: String, required: true },
    dailyRate: Number,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
}, {collection: "Rental"});

module.exports = mongoose.model('Rental', rentalSchema);