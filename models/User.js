const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Exporter le modèle
module.exports = mongoose.model('User', UserSchema);
