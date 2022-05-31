const express = require('express');
const adminAccountManageController = require('../controllers/adminAccountManage');
const router = express.Router();

router.get('/profile/:id/back', adminAccountManageController.back);
router.get('/profile/:id/unlock', adminAccountManageController.unlock);
router.get('/profile/:id/:value', adminAccountManageController.lock);
router.get('/profile/:id', adminAccountManageController.profile);
router.get('/', adminAccountManageController.index);

module.exports = router;