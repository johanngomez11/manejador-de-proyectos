const express = require('express');

function create(req, res, next) {
    res.send(`POST => /columns/ => ${req.body.name}`);
}

function list(req, res, next) {
    res.send('GET => /columns/');
}

function index(req, res, next) {
    res.send(`GET => /columns/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /columns/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /columns/:id');
}

module.exports = {create, list, index, update, destroy};
