const express = require('express');
const Permission = require('../models/permission');

// Modelo RESTFUL para Permission
function create(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;

    let permission = new Permission({
        name: name,
        description: description
    });

    permission.save()
        .then(obj => res.status(200).json({
            msg: "Permission creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear la Permission",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Permission.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de Permissions",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de Permissions",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Permission.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Permission con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la Permission",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let description = req.body.description ? req.body.description : "";

    let permission = {
        name: name,
        description: description
    };

    Permission.findOneAndUpdate({ "_id": id }, permission)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la Permission",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la Permission",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.description) updates.description = req.body.description;

    Permission.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó la Permission",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar la Permission",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Permission.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Permission eliminada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar la Permission",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
