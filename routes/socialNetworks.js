const express = require('express');
const router = express.Router();
const controller = require('../controllers/socialNetworks');

/* POST create socialNetwork. */
router.post('/', controller.create);

/* GET socialNetworks listing. */
router.get('/', controller.list);

/* GET socialNetwork by id. */
router.get('/:id', controller.index);

/* PUT update socialNetwork by id. */
router.put('/:id', controller.update);

/* DELETE socialNetwork by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
