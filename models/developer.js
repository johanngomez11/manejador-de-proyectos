const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Developer
const schema = mongoose.Schema({
    fullName: { type: String, required: true }, // Nombre completo del desarrollador
    dateOfBirth: { type: Date, required: true }, // Fecha de nacimiento
    CURP: { type: String, required: true, unique: true }, // CURP único
    RFC: { type: String, required: true, unique: true }, // RFC único
    address: { // Dirección del desarrollador
        street: { type: String, required: true },
        number: { type: String, required: true },
        zip: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }
    },
    skills: { type: [String], default: [] }, // Lista de habilidades
    socialNetwork: { type: [Object], default: [] } // Redes sociales asociadas
});

// Clase Developer
class Developer {
    constructor(fullName, dateOfBirth, CURP, RFC, address, skills = [], socialNetwork = []) {
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.CURP = CURP;
        this.RFC = RFC;
        this.address = address;
        this.skills = skills;
        this.socialNetwork = socialNetwork;
    }

    // Getters y Setters
    getFullName() {
        return this.fullName;
    }

    setFullName(value) {
        this.fullName = value;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    setDateOfBirth(value) {
        this.dateOfBirth = value;
    }

    getCURP() {
        return this.CURP;
    }

    setCURP(value) {
        this.CURP = value;
    }

    getRFC() {
        return this.RFC;
    }

    setRFC(value) {
        this.RFC = value;
    }

    getAddress() {
        return this.address;
    }

    setAddress(value) {
        this.address = value;
    }

    getSkills() {
        return this.skills;
    }

    setSkills(value) {
        this.skills = value;
    }

    getSocialNetwork() {
        return this.socialNetwork;
    }

    setSocialNetwork(value) {
        this.socialNetwork = value;
    }
}

schema.loadClass(Developer);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Developer', schema);
