const userService = require('../services/user.service');
const analyticsService = require('../services/analytics.service');
const prisma = require('../config/db');
const { updatePasswordSchema } = require('../validators/common.validator');

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = updatePasswordSchema.parse(req.body);
    const result = await userService.updatePassword(req.user.id, currentPassword, newPassword);
    res.json(result);
  } catch (err) {
    if (err.issues) return res.status(400).json({ message: err.issues[0].message });
    res.status(400).json({ message: err.message });
  }
}

async function myStoreDashboard(req, res) {
  try {
    const store = await prisma.store.findUnique({ where: { ownerId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'No store found for this owner' });
    const dashboard = await analyticsService.getStoreOwnerDashboard(store.id);
    res.json(dashboard);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

module.exports = { changePassword, myStoreDashboard };