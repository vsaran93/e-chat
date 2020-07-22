const express = require('express');
const router =  express.Router();
const authenticate = require('../src/middlewares/verifyToken');
const userController = require('../src/controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/get-users', authenticate, userController.getAllUers);

module.exports = router;