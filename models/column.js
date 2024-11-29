const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Column
const schema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la columna
    userStories: { type: [Object], default: [] } // Lista de historias de usuario asociadas
});

// Clase Column
class Column {
    constructor(name, userStories = []) {
        this.name = name;
        this.userStories = userStories;
    }

    // Getters y Setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getUserStories() {
        return this.userStories;
    }

    setUserStories(value) {
        this.userStories = value;
    }
}

schema.loadClass(Column);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Column', schema);
