const userService = require('../services/user.service');
const storeService = require('../services/store.service');
const analyticsService = require('../services/analytics.service');
const { createUserSchema, createStoreSchema } = require('../validators/common.validator');

async function dashboardStats(req, res) {
  try {
    const stats = await analyticsService.getAdminDashboardStats();
    res.json(stats);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

async function addUser(req, res) {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await userService.createUser(data);
    res.status(201).json(user);
  } catch (err) {
    if (err.issues) return res.status(400).json({ message: err.issues[0].message });
    res.status(400).json({ message: err.message });
  }
}

async function addStore(req, res) {
  try {
    const data = createStoreSchema.parse(req.body);
    const store = await storeService.createStore(data);
    res.status(201).json(store);
  } catch (err) {
    if (err.issues) return res.status(400).json({ message: err.issues[0].message });
    res.status(400).json({ message: err.message });
  }
}

async function listUsers(req, res) {
  try {
    const users = await userService.listUsers(req.query);
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

async function listStores(req, res) {
  try {
    const stores = await storeService.listStoresAdmin(req.query);
    res.json(stores);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

async function userDetail(req, res) {
  try {
    const user = await userService.getUserDetail(req.params.id);
    res.json(user);
  } catch (err) { res.status(404).json({ message: err.message }); }
}

module.exports = { dashboardStats, addUser, addStore, listUsers, listStores, userDetail };