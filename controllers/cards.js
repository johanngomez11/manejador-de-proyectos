const express = require('express');

function create(req, res, next) {
    res.send(`POST => /cards/ => ${req.body.name}`);
}

function list(req, res, next) {
    res.send('GET => /cards/');
}

function index(req, res, next) {
    res.send(`GET => /cards/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /cards/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /cards/:id');
}

module.exports = {create, list, index, update, destroy};
