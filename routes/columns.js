const express = require('express');
const router = express.Router();
const controller = require('../controllers/columns');

/* POST create column. */
router.post('/', controller.create);

/* GET columns listing. */
router.get('/', controller.list);

/* GET column by id. */
router.get('/:id', controller.index);

/* PUT update column by id. */
router.put('/:id', controller.update);

/* DELETE column by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
