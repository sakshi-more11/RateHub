const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const rating = require('../controllers/rating.controller');

router.post('/', requireAuth, requireRole('NORMAL_USER'), rating.submitRating);
router.delete('/:storeId', requireAuth, requireRole('NORMAL_USER'), rating.removeRating);

module.exports = router;