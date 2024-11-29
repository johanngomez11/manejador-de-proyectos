const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Sprint
const schema = mongoose.Schema({
    number: { type: Number, required: true }, // Número del sprint
    startDate: { type: Date, required: true }, // Fecha de inicio del sprint
    endDate: { type: Date, required: true }, // Fecha de finalización del sprint
    velocity: { type: Number, required: true }, // Velocidad del sprint
    burnDownProgress: { type: Number, default: 0 }, // Progreso del gráfico burn-down
    retrospective: { type: String, default: "" } // Retrospectiva del sprint
});

// Clase Sprint
class Sprint {
    constructor(number, startDate, endDate, velocity, burnDownProgress = 0, retrospective = "") {
        this.number = number;
        this.startDate = startDate;
        this.endDate = endDate;
        this.velocity = velocity;
        this.burnDownProgress = burnDownProgress;
        this.retrospective = retrospective;
    }

    // Getters y Setters
    getNumber() {
        return this.number;
    }

    setNumber(value) {
        this.number = value;
    }

    getStartDate() {
        return this.startDate;
    }

    setStartDate(value) {
        this.startDate = value;
    }

    getEndDate() {
        return this.endDate;
    }

    setEndDate(value) {
        this.endDate = value;
    }

    getVelocity() {
        return this.velocity;
    }

    setVelocity(value) {
        this.velocity = value;
    }

    getBurnDownProgress() {
        return this.burnDownProgress;
    }

    setBurnDownProgress(value) {
        this.burnDownProgress = value;
    }

    getRetrospective() {
        return this.retrospective;
    }

    setRetrospective(value) {
        this.retrospective = value;
    }
}

schema.loadClass(Sprint);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sprint', schema);
