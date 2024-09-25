const express = require('express');
const router = express.Router();
const controller = require('../controllers/sprints');

/* POST create sprint. */
router.post('/', controller.create);

/* GET sprints listing. */
router.get('/', controller.list);

/* GET sprint by id. */
router.get('/:id', controller.index);

/* PUT update sprint by id. */
router.put('/:id', controller.update);

/* DELETE sprint by id. */
router.delete('/:id', controller.destroy);

module.exports = router;
