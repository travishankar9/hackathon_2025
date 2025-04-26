const express = require('express');
const router = express.Router();

// GET /api/user/:id/posts
router.get('/:id/posts', (req, res) => getUserPost(res,res));

// GET /api/user/:id/interested
router.get('/:id/interested', (req, res) => getUserLikes(res,res));

module.exports = router;
