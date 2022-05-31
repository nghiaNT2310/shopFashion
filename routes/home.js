const express = require('express');
const homeController = require('../controllers/home');
const userAccountController = require('../controllers/userAccount');
const router = express.Router();

router.get('/login', userAccountController.login);
router.post('/login', userAccountController.validateLogin);
router.get('/register', userAccountController.register);
router.post('/register', userAccountController.store);
router.get('/productList',homeController.productList)
router.get('/shirtList',homeController.shirtList)
router.get('/pantsList',homeController.pantsList)
router.get('/setList',homeController.setList)
router.get('/discountList',homeController.discountList)
router.get('/size',homeController.sizeTable)
router.get('/termOfService',homeController.termOfService)
router.get('/returnPolicy',homeController.returnPolicy)
router.get('/privacyPolicy',homeController.privacyPolicy)
router.get('/productDetail/:id',homeController.productDetail)
router.get('/', homeController.index);

module.exports = router;