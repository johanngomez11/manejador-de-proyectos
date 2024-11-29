const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad SocialNetwork
const schema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la red social
    loginToken: { type: String, required: true }, // Token de autenticación
    authenticated: { type: Boolean, default: false } // Indica si la red social está autenticada
});

// Clase SocialNetwork
class SocialNetwork {
    constructor(name, loginToken, authenticated = false) {
        this.name = name;
        this.loginToken = loginToken;
        this.authenticated = authenticated;
    }

    // Getters y Setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getLoginToken() {
        return this.loginToken;
    }

    setLoginToken(value) {
        this.loginToken = value;
    }

    getAuthenticated() {
        return this.authenticated;
    }

    setAuthenticated(value) {
        this.authenticated = value;
    }
}

schema.loadClass(SocialNetwork);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('SocialNetwork', schema);
