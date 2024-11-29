const express = require('express');
const Column = require('../models/column');

// Modelo RESTFUL para Column
function create(req, res, next) {
    const name = req.body.name;
    const userStories = req.body.userStories || [];

    let column = new Column({
        name: name,
        userStories: userStories
    });

    column.save()
        .then(obj => res.status(200).json({
            msg: "Column creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear la Column",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Column.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de Columns",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de Columns",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Column.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Column con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la Column",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let userStories = req.body.userStories ? req.body.userStories : [];

    let column = {
        name: name,
        userStories: userStories
    };

    Column.findOneAndUpdate({ "_id": id }, column)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la Column",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la Column",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.userStories) updates.userStories = req.body.userStories;

    Column.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó la Column",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar la Column",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Column.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Column eliminada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar la Column",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
