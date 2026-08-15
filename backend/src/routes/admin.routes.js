const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const admin = require('../controllers/admin.controller');

router.use(requireAuth, requireRole('ADMIN'));
router.get('/dashboard', admin.dashboardStats);
router.post('/users', admin.addUser);
router.post('/stores', admin.addStore);
router.get('/users', admin.listUsers);
router.get('/stores', admin.listStores);
router.get('/users/:id', admin.userDetail);

module.exports = router;