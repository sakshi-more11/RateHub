const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const user = require('../controllers/user.controller');

router.put('/password', requireAuth, user.changePassword);
router.get('/my-store', requireAuth, requireRole('STORE_OWNER'), user.myStoreDashboard);

module.exports = router;