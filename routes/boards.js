const express = require('express');
const router = express.Router();
const controller = require('../controllers/boards');

/* POST create board. */
router.post('/', controller.create);

/* GET boards listing. */
router.get('/', controller.list);

/* GET board by id. */
router.get('/:id', controller.index);

/* PUT update board by id. */
router.put('/:id', controller.update);

/* DELETE board by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
