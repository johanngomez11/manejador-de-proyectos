const express = require('express');
const router = express.Router();
const controller = require('../controllers/cards');

/* POST create card. */
router.post('/', controller.create);

/* GET cards listing. */
router.get('/', controller.list);

/* GET card by id. */
router.get('/:id', controller.index);

/* PUT update card by id. */
router.put('/:id', controller.update);

/* DELETE card by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
