const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Board
const schema = mongoose.Schema({
    productBacklog: { type: [Object], default: [] }, // Lista de columnas asociadas al backlog del producto
    releaseBacklogs: { type: [Object], default: [] }, // Lista de columnas asociadas a los release backlogs
    sprintBacklogs: { type: [Object], default: [] } // Lista de columnas asociadas a los sprint backlogs
});

// Clase Board
class Board {
    constructor(productBacklog = [], releaseBacklogs = [], sprintBacklogs = []) {
        this.productBacklog = productBacklog;
        this.releaseBacklogs = releaseBacklogs;
        this.sprintBacklogs = sprintBacklogs;
    }

    // Getters y Setters
    getProductBacklog() {
        return this.productBacklog;
    }

    setProductBacklog(value) {
        this.productBacklog = value;
    }

    getReleaseBacklogs() {
        return this.releaseBacklogs;
    }

    setReleaseBacklogs(value) {
        this.releaseBacklogs = value;
    }

    getSprintBacklogs() {
        return this.sprintBacklogs;
    }

    setSprintBacklogs(value) {
        this.sprintBacklogs = value;
    }
}

schema.loadClass(Board);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Board', schema);
