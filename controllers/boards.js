const express = require('express');
const Board = require('../models/board');

// Modelo RESTFUL para Board
function create(req, res, next) {
    const productBacklog = req.body.productBacklog;
    const releaseBacklogs = req.body.releaseBacklogs;
    const sprintBacklogs = req.body.sprintBacklogs;

    let board = new Board({
        productBacklog: productBacklog,
        releaseBacklogs: releaseBacklogs,
        sprintBacklogs: sprintBacklogs,
    });

    board.save()
        .then(obj => res.status(200).json({
            msg: "Board creado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear el Board",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Board.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de Boards",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de Boards",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Board.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Board con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar el Board",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let productBacklog = req.body.productBacklog ? req.body.productBacklog : [];
    let releaseBacklogs = req.body.releaseBacklogs ? req.body.releaseBacklogs : [];
    let sprintBacklogs = req.body.sprintBacklogs ? req.body.sprintBacklogs : [];

    let board = {
        productBacklog: productBacklog,
        releaseBacklogs: releaseBacklogs,
        sprintBacklogs: sprintBacklogs
    };

    Board.findOneAndUpdate({ "_id": id }, board)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el Board",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el Board",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.productBacklog) updates.productBacklog = req.body.productBacklog;
    if (req.body.releaseBacklogs) updates.releaseBacklogs = req.body.releaseBacklogs;
    if (req.body.sprintBacklogs) updates.sprintBacklogs = req.body.sprintBacklogs;

    Board.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó el Board",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar el Board",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Board.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Board eliminado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar el Board",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
