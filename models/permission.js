const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Permission
const schema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre del permiso
    description: { type: String, default: "" } // Descripción del permiso
});

// Clase Permission
class Permission {
    constructor(name, description = "") {
        this.name = name;
        this.description = description;
    }

    // Getters y Setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getDescription() {
        return this.description;
    }

    setDescription(value) {
        this.description = value;
    }
}

schema.loadClass(Permission);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Permission', schema);
