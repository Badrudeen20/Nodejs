
const { check, validationResult } = require('express-validator');
exports.validate = [
    check('username').trim().notEmpty().withMessage('Username required'),
    check('email').trim().notEmpty().withMessage('Email required'),
    check('password').trim().notEmpty().withMessage('Password required'),
]





