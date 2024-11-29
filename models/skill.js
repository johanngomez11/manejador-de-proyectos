const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad Skill
const schema = mongoose.Schema({
    skillName: { type: String, required: true }, // Nombre de la habilidad
    level: { 
        type: String, 
        required: true, 
        enum: ['JUNIOR', 'SENIOR', 'MASTER'] 
    } // Nivel de la habilidad
});

// Clase Skill
class Skill {
    constructor(skillName, level) {
        this.skillName = skillName;
        this.level = level;
    }

    // Getters y Setters
    getSkillName() {
        return this.skillName;
    }

    setSkillName(value) {
        this.skillName = value;
    }

    getLevel() {
        return this.level;
    }

    setLevel(value) {
        this.level = value;
    }
}

schema.loadClass(Skill);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Skill', schema);
