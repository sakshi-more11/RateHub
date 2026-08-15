const ratingService = require('../services/rating.service');
const { submitRatingSchema } = require('../validators/common.validator');

async function submitRating(req, res) {
  try {
    const { storeId, value } = submitRatingSchema.parse(req.body);
    const rating = await ratingService.submitOrUpdateRating(req.user.id, storeId, value);
    res.status(200).json(rating);
  } catch (err) {
    if (err.issues) return res.status(400).json({ message: err.issues[0].message });
    res.status(400).json({ message: err.message });
  }
}
async function removeRating(req, res) {
  try {
    const storeId = Number(req.params.storeId);
    await ratingService.deleteRating(req.user.id, storeId);
    res.status(200).json({ message: 'Rating removed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { submitRating, removeRating };
