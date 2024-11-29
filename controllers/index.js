const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

// Renderiza la página principal
function home(req, res, next) {
    res.render('index', { title: 'Express' });
}

// Manejo de login
function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const jwtKey = config.get('secret.key');

    User.findOne({ email: email }).then(user => {
        // Validar si el usuario fue encontrado
        if (user) {
            bcrypt.hash(password, user.salt, (err, hash) => {
                if (err) {
                    return res.status(403).json({
                        msg: res.__('login.fail'),
                        obj: null
                    });
                }

                // Comparar el hash de la contraseña
                if (hash === user.password) {
                    return res.status(200).json({
                        msg: res.__('login.ok'),
                        obj: jwt.sign({
                            data: user.id,
                            exp: Math.floor(Date.now() / 1000) + 180 // Token válido por 3 minutos
                        }, jwtKey)
                    });
                } else {
                    return res.status(403).json({
                        msg: res.__('login.fail'),
                        obj: null
                    });
                }
            });
        } else {
            // Usuario no encontrado
            return res.status(403).json({
                msg: res.__('login.fail'),
                obj: null
            });
        }
    }).catch(err => {
        // Manejo de errores
        res.status(500).json({
            msg: res.__('login.error'),
            obj: err
        });
    });
}

module.exports = { home, login };
