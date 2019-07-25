const express = require('express');
const validate = require('express-validation');

const authController = require('../controllers/auth.controller');
const { login, register, forgotPassword, sendEmailVerifyCode } = require('../validations/auth.validation');

const router = express.Router();

router.route('/register').post(validate(register), authController.register);
router.route('/login').post(validate(login), authController.login);
router.route('/forgot-password').put(validate(forgotPassword), authController.forgotPassword);
router.route('/send-verify-code').post(validate(sendEmailVerifyCode), authController.sendEmailVerifyCode);

module.exports = router;
