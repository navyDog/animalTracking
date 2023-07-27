const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const animalSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    type: { type: String, required: true},
    date: { type: Array, required: true},
    coord: { type: Array, required: true}
    
});


animalSchema.plugin(uniqueValidator);

module.exports = mongoose.model('animals', animalSchema);
