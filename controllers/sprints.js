const express = require('express');

function create(req, res, next) {
    res.send(`POST => /sprints/ => ${req.body.number}`);
}

function list(req, res, next) {
    res.send('GET => /sprints/');
}

function index(req, res, next) {
    res.send(`GET => /sprints/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /sprints/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /sprints/:id');
}

module.exports = {create, list, index, update, destroy};
