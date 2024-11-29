const express = require('express');
const Card = require('../models/card');

// Modelo RESTFUL para Card
function create(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const fibonacciValue = req.body.fibonacciValue;
    const priority = req.body.priority;
    const size = req.body.size;
    const status = req.body.status;

    let card = new Card({
        name: name,
        description: description,
        fibonacciValue: fibonacciValue,
        priority: priority,
        size: size,
        status: status
    });

    card.save()
        .then(obj => res.status(200).json({
            msg: "Card creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear la Card",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Card.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de Cards",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de Cards",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Card.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Card con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar la Card",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let description = req.body.description ? req.body.description : "";
    let fibonacciValue = req.body.fibonacciValue ? req.body.fibonacciValue : 0;
    let priority = req.body.priority ? req.body.priority : 0;
    let size = req.body.size ? req.body.size : 0;
    let status = req.body.status ? req.body.status : "TO_DO";

    let card = {
        name: name,
        description: description,
        fibonacciValue: fibonacciValue,
        priority: priority,
        size: size,
        status: status
    };

    Card.findOneAndUpdate({ "_id": id }, card)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó la Card",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar la Card",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.fibonacciValue) updates.fibonacciValue = req.body.fibonacciValue;
    if (req.body.priority) updates.priority = req.body.priority;
    if (req.body.size) updates.size = req.body.size;
    if (req.body.status) updates.status = req.body.status;

    Card.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó la Card",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar la Card",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Card.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Card eliminada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar la Card",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
