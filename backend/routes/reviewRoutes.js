
const express = require('express');
const { listReviews, submitReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', listReviews);
router.post('/', submitReview);

module.exports = router;
