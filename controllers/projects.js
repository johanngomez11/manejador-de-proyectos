const express = require('express');
const Project = require('../models/project');

// Modelo RESTFUL para Project
function create(req, res, next) {
    const name = req.body.name;
    const requestDate = req.body.requestDate;
    const startDate = req.body.startDate;
    const description = req.body.description;
    const projectManager = req.body.projectManager;
    const productOwner = req.body.productOwner;
    const developmentTeam = req.body.developmentTeam || []; // Lista de IDs del equipo de desarrollo
    const closureDate = req.body.closureDate;
    const results = req.body.results;

    let project = new Project({
        name,
        requestDate,
        startDate,
        description,
        projectManager,
        productOwner,
        developmentTeam,
        closureDate,
        results
    });

    project.save().then(obj => res.status(200).json({
        msg: "Project creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear el Project",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Project.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de Projects",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de Projects",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;

    Project.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `Project con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar el Project",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name || "";
    let requestDate = req.body.requestDate || null;
    let startDate = req.body.startDate || null;
    let description = req.body.description || "";
    let projectManager = req.body.projectManager || "";
    let productOwner = req.body.productOwner || "";
    let developmentTeam = req.body.developmentTeam || [];
    let closureDate = req.body.closureDate || null;
    let results = req.body.results || "";

    let project = {
        name,
        requestDate,
        startDate,
        description,
        projectManager,
        productOwner,
        developmentTeam,
        closureDate,
        results
    };

    Project.findOneAndUpdate({ "_id": id }, project).then(obj => res.status(200).json({
        msg: "Se reemplazó el Project",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar el Project",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.requestDate) updates.requestDate = req.body.requestDate;
    if (req.body.startDate) updates.startDate = req.body.startDate;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.projectManager) updates.projectManager = req.body.projectManager;
    if (req.body.productOwner) updates.productOwner = req.body.productOwner;
    if (req.body.developmentTeam) updates.developmentTeam = req.body.developmentTeam;
    if (req.body.closureDate) updates.closureDate = req.body.closureDate;
    if (req.body.results) updates.results = req.body.results;

    Project.findOneAndUpdate({ "_id": id }, updates).then(obj => res.status(200).json({
        msg: "Se actualizó el Project",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar el Project",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Project.findByIdAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "Project eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el Project",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
