const express = require('express');
const Developer = require('../models/developer');

// Modelo RESTFUL para Developer
function create(req, res, next) {
    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    const fullName = req.body.fullName;
    const dateOfBirth = req.body.dateOfBirth;
    const CURP = req.body.CURP;
    const RFC = req.body.RFC;
    const skills = req.body.skills || []; // Lista de habilidades
    const socialNetwork = req.body.socialNetwork || []; // Lista de redes sociales

    let developer = new Developer({
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        CURP: CURP,
        RFC: RFC,
        address: address,
        skills: skills,
        socialNetwork: socialNetwork
    });

    developer.save()
        .then(obj => res.status(200).json({
            msg: "Developer creado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo crear el Developer",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    Developer.paginate({}, options)
        .then(objs => res.status(200).json({
            msg: "Lista de Developers",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo obtener la lista de Developers",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Developer.findOne({ "_id": id })
        .then(obj => res.status(200).json({
            msg: `Developer con el id ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo consultar el Developer",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;

    let address = new Object();
    address.street = req.body.street || "";
    address.number = req.body.number || "";
    address.zip = req.body.zip || 0;
    address.city = req.body.city || "";
    address.state = req.body.state || "";
    address.country = req.body.country || "";

    let fullName = req.body.fullName ? req.body.fullName : "";
    let dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : null;
    let CURP = req.body.CURP ? req.body.CURP : "";
    let RFC = req.body.RFC ? req.body.RFC : "";
    let skills = req.body.skills ? req.body.skills : [];
    let socialNetwork = req.body.socialNetwork ? req.body.socialNetwork : [];

    let developer = {
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        CURP: CURP,
        RFC: RFC,
        address: address,
        skills: skills,
        socialNetwork: socialNetwork
    };

    Developer.findOneAndUpdate({ "_id": id }, developer)
        .then(obj => res.status(200).json({
            msg: "Se reemplazó el Developer",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo reemplazar el Developer",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.fullName) updates.fullName = req.body.fullName;
    if (req.body.dateOfBirth) updates.dateOfBirth = req.body.dateOfBirth;
    if (req.body.CURP) updates.CURP = req.body.CURP;
    if (req.body.RFC) updates.RFC = req.body.RFC;

    let address = new Object();
    if (req.body.street) address.street = req.body.street;
    if (req.body.number) address.number = req.body.number;
    if (req.body.zip) address.zip = req.body.zip;
    if (req.body.city) address.city = req.body.city;
    if (req.body.state) address.state = req.body.state;
    if (req.body.country) address.country = req.body.country;

    if (Object.keys(address).length > 0) updates.address = address;

    if (req.body.skills) updates.skills = req.body.skills;
    if (req.body.socialNetwork) updates.socialNetwork = req.body.socialNetwork;

    Developer.findOneAndUpdate({ "_id": id }, updates)
        .then(obj => res.status(200).json({
            msg: "Se actualizó el Developer",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo actualizar el Developer",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Developer.findByIdAndDelete({ "_id": id })
        .then(obj => res.status(200).json({
            msg: "Developer eliminado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            msg: "No se pudo eliminar el Developer",
            obj: ex
        }));
}

module.exports = { create, list, index, replace, update, destroy };
