const express = require('express');
const SocialNetwork = require('../models/socialNetwork');

// Modelo RESTFUL para SocialNetwork
function create(req, res, next) {
    const name = req.body.name;
    const loginToken = req.body.loginToken;
    const authenticated = req.body.authenticated || false; // Valor predeterminado: false

    let socialNetwork = new SocialNetwork({
        name: name,
        loginToken: loginToken,
        authenticated: authenticated
    });

    socialNetwork.save().then(obj => res.status(200).json({
        msg: "SocialNetwork creada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear la SocialNetwork",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };

    SocialNetwork.paginate({}, options).then(objs => res.status(200).json({
        msg: "Lista de SocialNetworks",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de SocialNetworks",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;

    SocialNetwork.findOne({ "_id": id }).then(obj => res.status(200).json({
        msg: `SocialNetwork con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar la SocialNetwork",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name || "";
    let loginToken = req.body.loginToken || "";
    let authenticated = req.body.authenticated || false;

    let socialNetwork = {
        name: name,
        loginToken: loginToken,
        authenticated: authenticated
    };

    SocialNetwork.findOneAndUpdate({ "_id": id }, socialNetwork).then(obj => res.status(200).json({
        msg: "Se reemplazó la SocialNetwork",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar la SocialNetwork",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;

    let updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.loginToken) updates.loginToken = req.body.loginToken;
    if (req.body.authenticated !== undefined) updates.authenticated = req.body.authenticated;

    SocialNetwork.findOneAndUpdate({ "_id": id }, updates).then(obj => res.status(200).json({
        msg: "Se actualizó la SocialNetwork",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar la SocialNetwork",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    SocialNetwork.findByIdAndDelete({ "_id": id }).then(obj => res.status(200).json({
        msg: "SocialNetwork eliminada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar la SocialNetwork",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
