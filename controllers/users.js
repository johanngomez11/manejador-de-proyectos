const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Modelo RESTFUL
async function create(req, res, next) {
    const name = req.body.name;
    const email = req.body.email; // Incluyendo email aunque no esté en el diagrama (puede ser útil para login)
    const password = req.body.password;
    const socialNetworks = req.body.socialNetworks || []; // Lista de redes sociales
    const rolesInProjects = req.body.rolesInProjects || []; // Lista de roles en proyectos
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name: name,
        email: email,
        password: passwordHash,
        salt: salt,
        socialNetworks: socialNetworks,
        rolesInProjects: rolesInProjects
    });

    user.save().then(obj => res.status(200).json({
        msg: "Usuario almacenado correctamente.",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el usuario.",
        obj: ex
    }));
}

function list(req, res, next) {
    User.find().then(users => res.status(200).json({
        msg: "Lista de usuarios.",
        obj: users
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de usuarios.",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;

    User.findById(id).then(user => res.status(200).json({
        msg: `Usuario con ID ${id}.`,
        obj: user
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar el usuario.",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const updatedUser = {
        name: req.body.name || "",
        socialNetworks: req.body.socialNetworks || [],
        rolesInProjects: req.body.rolesInProjects || []
    };

    User.findByIdAndUpdate(id, updatedUser, { new: true }).then(user => res.status(200).json({
        msg: "Usuario reemplazado correctamente.",
        obj: user
    })).catch(ex => res.status(500).json({
        msg: "No se pudo reemplazar el usuario.",
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.socialNetworks) updates.socialNetworks = req.body.socialNetworks;
    if (req.body.rolesInProjects) updates.rolesInProjects = req.body.rolesInProjects;

    User.findByIdAndUpdate(id, updates, { new: true }).then(user => res.status(200).json({
        msg: "Usuario actualizado correctamente.",
        obj: user
    })).catch(ex => res.status(500).json({
        msg: "No se pudo actualizar el usuario.",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    User.findByIdAndDelete(id).then(user => res.status(200).json({
        msg: "Usuario eliminado correctamente.",
        obj: user
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el usuario.",
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy };
