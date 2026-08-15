const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');
const store = require('../controllers/store.controller');

router.use(requireAuth);
router.get('/', store.browseStores);
router.get('/top-rated', store.topRated);

module.exports = router;