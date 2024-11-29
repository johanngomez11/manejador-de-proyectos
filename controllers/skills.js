const express = require('express');
const Skill = require('../models/skill');

// Modelo RESTFUL para Skill
function create(req, res, next) {
    const skillName = req.body.skillName;
    const level = req.body.level; // Debe ser uno de los valores: JUNIOR, SENIOR, MASTER

    let skill = new Skill({
        skillName: skillName,
        level: level
    });

    skill.save().then(obj => res.status(200).json({
        msg: "Skill creada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear la Skill",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Skill.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de Skills",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de Skills",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;

    Skill.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `Skill con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la Skill",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let skillName = req.body.skillName || "";
    let level = req.body.level || "JUNIOR"; // Predeterminado a JUNIOR si no se proporciona

    let skill = {
        skillName: skillName,
        level: level
    };

    Skill.findOneAndUpdate({ "_id": id }, skill).then(obj => res.status(200).json({
        msg: "Se reemplazó la Skill",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar la Skill",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.skillName) updates.skillName = req.body.skillName;
    if (req.body.level) updates.level = req.body.level;

    Skill.findOneAndUpdate({ "_id": id }, updates).then(obj => res.status(200).json({
        msg: "Se actualizó la Skill",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar la Skill",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Skill.findByIdAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "Skill eliminada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar la Skill",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
