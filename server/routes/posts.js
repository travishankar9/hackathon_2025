const express = require('express');
const router = express.Router();

// GET /api/posts
router.get('/', (req, res) => getPosts());

// GET /api/posts/:id
router.get('/:id', (req, res) => getIndividualPost());

// POST /api/posts/create
router.post('/create', (req, res) => createPost());

module.exports = router;
