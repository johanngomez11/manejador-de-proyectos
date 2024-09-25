const express = require('express');
const router = express.Router();
const controller = require('../controllers/retrospectives');

/* POST create retrospective. */
router.post('/', controller.create);

/* GET retrospectives listing. */
router.get('/', controller.list);

/* GET retrospective by id. */
router.get('/:id', controller.index);

/* PUT update retrospective by id. */
router.put('/:id', controller.update);

/* DELETE retrospective by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
