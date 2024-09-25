const express = require('express');
const router = express.Router();
const controller = require('../controllers/developers');

/* POST create developer. */
router.post('/', controller.create);

/* GET developers listing. */
router.get('/', controller.list);

/* GET developer by id. */
router.get('/:id', controller.index);

/* PUT update developer by id. */
router.put('/:id', controller.update);

/* DELETE developer by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
