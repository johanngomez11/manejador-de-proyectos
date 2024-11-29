const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Card
const schema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la tarjeta
    description: { type: String, default: "" }, // Descripción de la tarjeta
    fibonacciValue: { type: Number, required: true }, // Valor de Fibonacci para estimación
    priority: { type: Number, required: true }, // Prioridad de la tarjeta
    size: { type: Number, required: true }, // Tamaño de la tarjeta
    status: { 
        type: String, 
        enum: ['TO_DO', 'DOING', 'DONE'], 
        required: true 
    } // Estado de la tarjeta
});

// Clase Card
class Card {
    constructor(name, description = "", fibonacciValue, priority, size, status) {
        this.name = name;
        this.description = description;
        this.fibonacciValue = fibonacciValue;
        this.priority = priority;
        this.size = size;
        this.status = status;
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

    getFibonacciValue() {
        return this.fibonacciValue;
    }

    setFibonacciValue(value) {
        this.fibonacciValue = value;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(value) {
        this.priority = value;
    }

    getSize() {
        return this.size;
    }

    setSize(value) {
        this.size = value;
    }

    getStatus() {
        return this.status;
    }

    setStatus(value) {
        this.status = value;
    }
}

schema.loadClass(Card);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Card', schema);
