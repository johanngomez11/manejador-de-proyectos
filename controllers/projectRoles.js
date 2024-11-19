const express = require('express');

function create(req, res, next) {
    res.send(`POST => /projectRoles/ => ${req.body.roleName}`);
}

function list(req, res, next) {
    res.send('GET => /projectRoles/');
}

function index(req, res, next) {
    res.send(`GET => /projectRoles/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /projectRoles/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /projectRoles/:id');
}

module.exports = {create, list, index, update, destroy};
