const express = require('express');
const router = express.Router();
const controller = require('../controllers/permissions');

/* POST create permission. */
router.post('/', controller.create);

/* GET permissions listing. */
router.get('/', controller.list);

/* GET permission by id. */
router.get('/:id', controller.index);

/* PUT update permission by id. */
router.put('/:id', controller.update);

/* DELETE permission by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
