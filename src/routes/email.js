const express = require('express');
const router = express.Router();

const emailController = require('../services/Email/email.controller');

/**
 * POST /email
 * {
 *    "email": "..."
 * }
 */
router.post('/', emailController.collectEmail);

/**
 * GET /email/confirm/:id
 *
 */
router.get('/confirm/:id', emailController.confirmEmail);

module.exports = router;
