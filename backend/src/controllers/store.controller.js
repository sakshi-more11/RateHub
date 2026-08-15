const storeService = require('../services/store.service');

async function browseStores(req, res) {
  try {
    const stores = await storeService.listStoresForUser({ ...req.query, userId: req.user.id });
    res.json(stores);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

async function topRated(req, res) {
  try {
    const stores = await storeService.getTopRatedStores(5);
    res.json(stores);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

module.exports = { browseStores, topRated };