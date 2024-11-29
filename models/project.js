const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Project
const schema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre del proyecto
    requestDate: { type: Date, required: true }, // Fecha de solicitud del proyecto
    startDate: { type: Date, required: true }, // Fecha de inicio del proyecto
    description: { type: String, required: true }, // Descripción del proyecto
    projectManager: { type: String, required: true }, // Nombre o ID del gerente del proyecto
    productOwner: { type: String, required: true }, // Nombre o ID del product owner
    developmentTeam: { type: [String], default: [] }, // Lista de miembros del equipo de desarrollo
    closureDate: { type: Date, default: null }, // Fecha de cierre del proyecto
    results: { type: String, default: "" } // Resultados del proyecto
});

// Clase Project
class Project {
    constructor(name, requestDate, startDate, description, projectManager, productOwner, developmentTeam = [], closureDate = null, results = "") {
        this.name = name;
        this.requestDate = requestDate;
        this.startDate = startDate;
        this.description = description;
        this.projectManager = projectManager;
        this.productOwner = productOwner;
        this.developmentTeam = developmentTeam;
        this.closureDate = closureDate;
        this.results = results;
    }

    // Getters y Setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getRequestDate() {
        return this.requestDate;
    }

    setRequestDate(value) {
        this.requestDate = value;
    }

    getStartDate() {
        return this.startDate;
    }

    setStartDate(value) {
        this.startDate = value;
    }

    getDescription() {
        return this.description;
    }

    setDescription(value) {
        this.description = value;
    }

    getProjectManager() {
        return this.projectManager;
    }

    setProjectManager(value) {
        this.projectManager = value;
    }

    getProductOwner() {
        return this.productOwner;
    }

    setProductOwner(value) {
        this.productOwner = value;
    }

    getDevelopmentTeam() {
        return this.developmentTeam;
    }

    setDevelopmentTeam(value) {
        this.developmentTeam = value;
    }

    getClosureDate() {
        return this.closureDate;
    }

    setClosureDate(value) {
        this.closureDate = value;
    }

    getResults() {
        return this.results;
    }

    setResults(value) {
        this.results = value;
    }
}

schema.loadClass(Project);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', schema);
