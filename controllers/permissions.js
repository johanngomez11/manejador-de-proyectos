const express = require('express');

function create(req, res, next) {
    res.send(`POST => /permissions/ => ${req.body.name}`);
}

function list(req, res, next) {
    res.send('GET => /permissions/');
}

function index(req, res, next) {
    res.send(`GET => /permissions/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /permissions/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /permissions/:id');
}

module.exports = {create, list, index, update, destroy};
