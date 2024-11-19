const express = require('express');

function create(req, res, next) {
    res.send(`POST => /developers/ => ${req.body.fullname}`);
}

function list(req, res, next) {
    res.send('GET => /developers/');
}

function index(req, res, next) {
    res.send(`GET => /developers/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /developers/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /developers/:id');
}

module.exports = {create, list, index, update, destroy};
