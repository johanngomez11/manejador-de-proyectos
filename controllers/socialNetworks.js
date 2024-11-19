const express = require('express');

function create(req, res, next) {
    res.send(`POST => /socialNetworks/ => ${req.body.name}`);
}

function list(req, res, next) {
    res.send('GET => /socialNetworks/');
}

function index(req, res, next) {
    res.send(`GET => /socialNetworks/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /socialNetworks/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /socialNetworks/:id');
}

module.exports = {create, list, index, update, destroy};
