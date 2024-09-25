const express = require('express');
const router = express.Router();
const controller = require('../controllers/burndowncharts');

/* POST create burndown chart. */
router.post('/', controller.create);

/* GET burndown charts listing. */
router.get('/', controller.list);

/* GET burndown chart by id. */
router.get('/:id', controller.index);

/* PUT update burndown chart by id. */
router.put('/:id', controller.update);

/* DELETE burndown chart by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
