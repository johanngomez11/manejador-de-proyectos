const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre del usuario
    email: { type: String, required: true }, // Correo electrónico
    socialNetworks: { type: [Object], default: [] }, // Lista de redes sociales
    rolesInProjects: { type: [Object], default: [] }, // Lista de roles en proyectos
    password: { type: String, required: true }, // Hash de la contraseña
    salt: { type: String, required: true } // Salt utilizado para el hash
});

class User {
    constructor(name, email, socialNetworks = [], rolesInProjects = [], password, salt) {
        this.name = name;
        this.email = email;
        this.socialNetworks = socialNetworks;
        this.rolesInProjects = rolesInProjects;
        this.password = password;
        this.salt = salt;
    }

    // Getters y Setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getEmail() {
        return this.email;
    }

    setEmail(value) {
        this.email = value;
    }

    getSocialNetworks() {
        return this.socialNetworks;
    }

    setSocialNetworks(value) {
        this.socialNetworks = value;
    }

    getRolesInProjects() {
        return this.rolesInProjects;
    }

    setRolesInProjects(value) {
        this.rolesInProjects = value;
    }

    getPassword() {
        return this.password;
    }

    setPassword(value) {
        this.password = value;
    }

    getSalt() {
        return this.salt;
    }

    setSalt(value) {
        this.salt = value;
    }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);
