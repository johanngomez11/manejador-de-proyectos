const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de la entidad ProjectRole
const schema = mongoose.Schema({
    roleName: { 
        type: String, 
        required: true, 
        enum: ['SCRUM_MASTER', 'PRODUCT_OWNER', 'DEVELOPMENT'] 
    }, // Nombre del rol en el proyecto
    permissions: { type: [String], default: [] } // Lista de permisos asociados al rol
});

// Clase ProjectRole
class ProjectRole {
    constructor(roleName, permissions = []) {
        this.roleName = roleName;
        this.permissions = permissions;
    }

    // Getters y Setters
    getRoleName() {
        return this.roleName;
    }

    setRoleName(value) {
        this.roleName = value;
    }

    getPermissions() {
        return this.permissions;
    }

    setPermissions(value) {
        this.permissions = value;
    }
}

schema.loadClass(ProjectRole);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('ProjectRole', schema);
