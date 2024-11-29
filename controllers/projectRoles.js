const express = require('express');
const ProjectRole = require('../models/projectRole');

// Modelo RESTFUL para ProjectRole
function create(req, res, next) {
    const roleName = req.body.roleName;
    const permissions = req.body.permissions || []; // Lista de permisos asociados

    let projectRole = new ProjectRole({
        roleName: roleName,
        permissions: permissions
    });

    projectRole.save().then(obj => res.status(200).json({
        msg: "ProjectRole creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear el ProjectRole",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    ProjectRole.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de ProjectRoles",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de ProjectRoles",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;

    ProjectRole.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `ProjectRole con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar el ProjectRole",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let roleName = req.body.roleName ? req.body.roleName : "";
    let permissions = req.body.permissions ? req.body.permissions : [];

    let projectRole = {
        roleName: roleName,
        permissions: permissions
    };

    ProjectRole.findOneAndUpdate({ "_id": id }, projectRole).then(obj => res.status(200).json({
        msg: "Se reemplazó el ProjectRole",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar el ProjectRole",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.roleName) updates.roleName = req.body.roleName;
    if (req.body.permissions) updates.permissions = req.body.permissions;

    ProjectRole.findOneAndUpdate({ "_id": id }, updates).then(obj => res.status(200).json({
        msg: "Se actualizó el ProjectRole",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar el ProjectRole",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    ProjectRole.findByIdAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "ProjectRole eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el ProjectRole",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
