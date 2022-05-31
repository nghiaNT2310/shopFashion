const express = require('express');
const adminAccountController = require('../controllers/adminAccount');
const router = express.Router();

router.post('/changePwd', adminAccountController.storeNewPassword)
router.get('/changePwd', adminAccountController.changePassword)
router.get('/logout',adminAccountController.logout)
router.get('/', adminAccountController.login);
router.post('/', adminAccountController.validateLogin);

module.exports = router;