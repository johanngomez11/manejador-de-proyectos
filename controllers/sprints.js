const express = require('express');
const Sprint = require('../models/sprint');

// Modelo RESTFUL para Sprint
function create(req, res, next) {
    const number = req.body.number;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const velocity = req.body.velocity;
    const burnDownProgress = req.body.burnDownProgress;
    const retrospective = req.body.retrospective;

    let sprint = new Sprint({
        number: number,
        startDate: startDate,
        endDate: endDate,
        velocity: velocity,
        burnDownProgress: burnDownProgress,
        retrospective: retrospective
    });

    sprint.save().then(obj => res.status(200).json({
        msg: "Sprint creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear el Sprint",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Sprint.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de Sprints",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de Sprints",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;

    Sprint.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `Sprint con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar el Sprint",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let number = req.body.number || 0;
    let startDate = req.body.startDate || null;
    let endDate = req.body.endDate || null;
    let velocity = req.body.velocity || 0;
    let burnDownProgress = req.body.burnDownProgress || 0;
    let retrospective = req.body.retrospective || "";

    let sprint = {
        number: number,
        startDate: startDate,
        endDate: endDate,
        velocity: velocity,
        burnDownProgress: burnDownProgress,
        retrospective: retrospective
    };

    Sprint.findOneAndUpdate({ "_id": id }, sprint).then(obj => res.status(200).json({
        msg: "Se reemplazó el Sprint",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar el Sprint",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.number) updates.number = req.body.number;
    if (req.body.startDate) updates.startDate = req.body.startDate;
    if (req.body.endDate) updates.endDate = req.body.endDate;
    if (req.body.velocity) updates.velocity = req.body.velocity;
    if (req.body.burnDownProgress) updates.burnDownProgress = req.body.burnDownProgress;
    if (req.body.retrospective) updates.retrospective = req.body.retrospective;

    Sprint.findOneAndUpdate({ "_id": id }, updates).then(obj => res.status(200).json({
        msg: "Se actualizó el Sprint",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar el Sprint",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Sprint.findByIdAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "Sprint eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el Sprint",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
