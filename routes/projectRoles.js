const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectRoles');

/* POST create projectRole. */
router.post('/', controller.create);

/* GET projectRoles listing. */
router.get('/', controller.list);

/* GET projectRole by id. */
router.get('/:id', controller.index);

/* PUT update projectRole by id. */
router.put('/:id', controller.update);

/* DELETE projectRole by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
