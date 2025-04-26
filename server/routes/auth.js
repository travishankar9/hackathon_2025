const express = require('express');
const router = express.Router();
const {loginUser,registerUser} = require('../controllers/auth')

// POST route to register user
router.post('/register', registerUser);
// POST route to login a user
router.post('/login', (req, res) => loginUser(req,res));

module.exports = router;
